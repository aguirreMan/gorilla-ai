'use client'

import { createContext, useContext } from 'react'
import { useChat } from '@/hooks/chat/useChat'

type ChatContextType = ReturnType<typeof useChat>

export const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatContextProvider({ children }: { children: React.ReactNode }) {
  const chat = useChat()
  return (
    <ChatContext.Provider value={chat}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChatContext() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChatContext must be used within a ChatContextProvider')
  }
  return context
}
