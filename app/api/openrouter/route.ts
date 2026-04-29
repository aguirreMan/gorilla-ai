import { NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { OpenRouterRequest } from '@/types/openrouter'
import { chatGenerationRateLimiting } from '@/lib/upstash/chatLimit'
import { saveChatHistory, saveChatMessage } from '@/lib/supabase-chat/saveChatHistory'
import { GORILLA_SYSTEM_PROMPT } from '@/lib/prompts/gorilla'


export async function POST(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized user' }), { status: 401 })
  }

  const { success } = await chatGenerationRateLimiting.limit(userId)

  if (!success) {
    return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), { status: 429 })
  }

  const { model, messages, conversationId }: OpenRouterRequest = await request.json()
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model, messages: [{
        role: 'system',
        content: GORILLA_SYSTEM_PROMPT
      }, ...messages], stream: true })
  })

  if (!response.ok) {
    const errorData = await response.text()
    return new Response(errorData, {status: response.status})
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
      'Connection': 'keep alive'
    },
  })
}
