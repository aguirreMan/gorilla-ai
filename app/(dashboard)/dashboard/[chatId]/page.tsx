'use client'

import { useParams } from 'next/navigation'

export default function ChatIDPage() {
  const params = useParams<{ chatId: string }>()

console.log(params.chatId, 'This conversation was clickeds')

  return (
    <div>
      <h1>{params.chatId}</h1>
    </div>
  )
}
