'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useChatContext } from '@/context/chatContext'

export default function ChatIDPage() {
  const { chatId } = useParams<{ chatId: string }>()
  const { selectCurrentChat } = useChatContext()

  useEffect(() => {
    if (!chatId) return
    selectCurrentChat(chatId)
  }, [chatId, selectCurrentChat])

  return (
    <div>
      <h1>{chatId}</h1>
    </div>
  )
}
