'use client'

import { useState } from 'react'
import { useChat } from '@/hooks/chat/useChat'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Sidebar from '@/components/dashboard-components/Sidebar'
import MessageBox from '@/components/dashboard-components/MessageBox'
import UniversalChat from '@/components/dashboard-components/UniversalChat'


export default function DashboardChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)


  const {
    messages,
    isLoadingMessages,
    createNewChat,
    deleteChat,
    sendMessage,
    isStreaming,
    stopStreaming } = useChat()

  return (
    <div className='flex h-[calc(100dvh-4rem)]'>
      <Sidebar
        onNewChat={createNewChat}
        onDeleteConversation={deleteChat}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className='flex flex-col flex-1 min-h-0'>
         {children}
        {/*Mobile top bar  */}
        <div className='flex items-center gap-3 px-3 py-3 border-b md:hidden'>
          <Button
            className='mr-2'
            variant='ghost'
            size='icon'
            onClick={() => setSidebarOpen(true)}
            aria-label='Open sidebar'>
            <Menu size={20} />
          </Button>

        </div>
        <MessageBox messages={messages} isStreaming={isStreaming} isLoadingMessages={isLoadingMessages} />
          <div className='shrink-0 px-4 py-3 border-t bg-background'>
            <UniversalChat onSend={sendMessage} isStreaming={isStreaming} stopStreaming={stopStreaming} />
          </div>
      </div>
    </div>
  )
}
