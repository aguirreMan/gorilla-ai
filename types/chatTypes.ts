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

export interface Conversation {
  id: string
  title: string
  created_at: string
}

export interface Chatstate {
  conversations: Conversation[]
  conversationStore: ConversationStore
  selectedChat: string | null
  isLoading: boolean
}
