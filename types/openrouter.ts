export interface OpenRouterRequest {
  conversationID: string
  model: string
  messages: { role: string; content: string }[]
}
