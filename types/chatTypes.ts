export interface ConversationStore {
  [id: string]: Message[]
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export interface MessagesResponse {
  messages: Message[]
}

export interface StreamingResponse {
  content: string
}

export interface Conversation {
  id: string
  title: string
  created_at: string
}

export interface ConversationsResponse {
  conversations: Conversation[]
}

export interface Chatstate {
  conversationStore: ConversationStore
  selectedChat: string | null
  isLoadingMessages: boolean
}
