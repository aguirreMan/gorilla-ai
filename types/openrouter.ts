export interface OpenRouterRequest {
  conversationId: string
  model: string
  messages: { role: string; content: string }[]
}

export interface StreamingChunk {
  choices: Array<{
    delta?: {
      content?: string
    }
  }>
}