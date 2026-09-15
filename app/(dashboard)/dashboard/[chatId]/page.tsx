'use client'

import { useParams } from 'next/navigation'
import { useChat } from '@/hooks/chat/useChat'
import MessageBox from '@/components/dashboard-components/MessageBox'
import UniversalChat from '@/components/dashboard-components/UniversalChat'

export default function ChatIDPage() {
  const { chatId } = useParams<{ chatId: string }>()
  const { messages, isLoading, sendMessage, isStreaming, stopStreaming } = useChat(chatId)

  return (
    <div className='flex flex-col flex-1 min-h-0'>
      <MessageBox messages={messages} isStreaming={isStreaming} isLoadingMessages={isLoading} />
      <div className='shrink-0 px-4 py-3 border-t bg-background'>
        <UniversalChat onSend={sendMessage} isStreaming={isStreaming} stopStreaming={stopStreaming} />
      </div>
    </div>
  )
}
