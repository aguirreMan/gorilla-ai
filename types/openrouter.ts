export interface OpenRouterRequest {
  model: string
  messages: { role: string; content: string }[]
}
export interface OpenRouterResponse {
  choices: { message: { content: string } }[]
}
