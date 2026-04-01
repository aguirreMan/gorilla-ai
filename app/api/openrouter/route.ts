import { NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { OpenRouterRequest } from '@/types/openrouter'
import { chatGenerationRateLimiting } from '@/lib/upstash/chatLimit'

export async function POST(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized user' }), { status: 401 })
  }

  const { success } = await chatGenerationRateLimiting.limit(userId)

  if (!success) {
    return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), { status: 429 })
  }

  const { model, messages }: OpenRouterRequest = await request.json()
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({ model, messages, stream: true }),
  })
  if (!response.ok) {
    const errorData = await response.text()
    return new Response(errorData, {status: response.status})
  }
  return new Response(response.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream',
    },
  })
}
