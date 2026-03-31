import { NextRequest } from 'next/server'
import { OpenRouterRequest, OpenRouterResponse } from '@/types/openrouter'

export async function POST(request: NextRequest) {
  const { model, messages }: OpenRouterRequest = await request.json()
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({ model, messages }),
  })
  if (!response.ok) {
    const errorData = await response.text()
    return new Response(errorData, {status: response.status})
  }
  const data: OpenRouterResponse = await response.json()
  return new Response(JSON.stringify(data), { status: 200 })
}
