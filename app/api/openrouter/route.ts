import { supabaseServer } from '@/lib/supabase/supabaseServer'
import { NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { OpenRouterRequest } from '@/types/openrouter'
import { chatGenerationRateLimiting } from '@/lib/upstash/chatLimit'
import { saveChatHistory, saveChatMessage } from '@/lib/supabase-chat/saveChatHistory'
import { GORILLA_SYSTEM_PROMPT } from '@/lib/prompts/gorilla'

function isChatRequestValid(body: unknown): body is OpenRouterRequest {
  if (typeof body !== 'object' || body === null) {
    return false
  }

  const { model, messages, conversationId } = body as Record<string, unknown>

  const isValidConversationId =
    typeof conversationId === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(conversationId)

  const isValidModel = typeof model === 'string' && model.trim().length > 0

  if (!Array.isArray(messages) || messages.length === 0) return false

  const allMessagesValid = messages.every((msg) => {
    if (typeof msg !== 'object' || msg === null) return false

    const message = msg as Record<string, unknown>

    return (typeof message.content === 'string' && (message.role === 'user' || message.role === 'assistant'))
  })

  const lastMessage = messages[messages.length - 1] as Record<string, unknown>

  const lastMessageIsValidUserMessage =
    lastMessage.role === 'user' &&
    typeof lastMessage.content === 'string' &&
    lastMessage.content.trim().length > 0

  return (
    isValidConversationId &&
    isValidModel &&
    allMessagesValid &&
    lastMessageIsValidUserMessage
  )
}

export async function POST(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized user' }), { status: 401 })
  }

  const { success } = await chatGenerationRateLimiting.limit(userId)

  if (!success) {
    return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), { status: 429 })
  }


  try {
    const body: unknown = await request.json()
    if (!isChatRequestValid(body)) {
      return Response.json({ error: 'Invalid chat request' }, { status: 400 })
    }
    const { model, messages, conversationId } = body

    const { data: conversation, error: conversationError } = await supabaseServer
      .from('conversations')
      .select('id')
      .eq('id', conversationId)
      .eq('user_id', userId)
      .maybeSingle()

    if (conversationError) throw conversationError
    if (!conversation) {
      return Response.json({ error: 'Conversation not found' }, { status: 404 })
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      signal: request.signal,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model, messages: [{
          role: 'system',
          content: GORILLA_SYSTEM_PROMPT
        }, ...messages], stream: true
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      return new Response(errorData, { status: response.status })
    }


    const title = messages[0].content
    await saveChatHistory(conversationId, userId, title)

    //Save the latest messsage
    const latestUserMessage = messages[messages.length - 1]
    await saveChatMessage(conversationId, 'user', latestUserMessage.content)

    // stream
    let buffer = ''
    let fullMessageContent = ''
    const encoder = new TextEncoder()


    const transformStream = new TransformStream({
      async transform(chunk, controller) {
        buffer += new TextDecoder().decode(chunk, { stream: true })

        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (!line.startsWith('data:')) continue
          const jsonData = line.slice(5).trim()
          if (jsonData === '[DONE]') break
          try {
            const parseData = JSON.parse(jsonData)
            const content = parseData.choices[0]?.delta?.content
            if (content) {
              fullMessageContent += content
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`))
            }
          } catch (error) {
            console.error('Streaming parse Error happened ', error)
          }
        }
      },
      async flush() {
        if (fullMessageContent.trim()) {
          await saveChatMessage(conversationId, 'assistant', fullMessageContent)
        }
      }
    })

    return new Response(response.body?.pipeThrough(transformStream), {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      },
    })
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return new Response(null, { status: 499 })
    }
    console.error('Streaming Error happened ', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 })
  }
}
