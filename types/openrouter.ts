export interface OpenRouterRequest {
  model: string
  messages: { role: string; content: string }[]
}
