export interface ConversationStore {
  [id: string]: Message[]
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
}


export interface StreamingResponse {
  choices?: {
    delta?: {
      content?: string
    }
  }[]
}

export interface Chatstate {
  conversations: ConversationStore
  selectedChat: string | null
  isLoading: boolean
}
