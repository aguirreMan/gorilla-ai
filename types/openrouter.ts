export interface OpenRouterRequest {
  conversationId: string
  model: string
  messages: { role: string; content: string }[]
}
