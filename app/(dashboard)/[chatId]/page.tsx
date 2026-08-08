'use client'

//import { useEffect } from 'react'
import { useParams } from 'next/navigation'
//import { useChatContext } from '@/context/chatContext'

export default function ChatIDPage() {
  const params = useParams<{ chatId: string }>()
  // const { selectCurrentChat } = useChatContext()
console.log(params.chatId)
 /* useEffect(() => {
    if (!chatId) return
    selectCurrentChat(chatId)
  }, [chatId, selectCurrentChat])
  */

  return (
    <div>
      <h1>{params.chatId}</h1>
    </div>
  )
}
