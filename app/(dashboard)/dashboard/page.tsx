'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import UniversalChat from '@/components/dashboard-components/UniversalChat'
import Sidebar from '@/components/dashboard-components/Sidebar'
import MessageBox from '@/components/dashboard-components/MessageBox'
import DashboardSkeleton from '@/components/dashboard-components/DashboardSkeleton'
import { useChat } from '@/hooks/chat/useChat'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const { isSignedIn, isLoaded } = useUser()

  const {
    conversations,
    messages,
    isLoadingConversations,
    isLoadingMessages,
    selectedChat,
    createNewChat,
    selectCurrentChat,
    deleteChat,
    sendMessage,
    isStreaming,
    stopStreaming } = useChat()

  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!isLoaded) return <DashboardSkeleton />
  if (!isSignedIn) return null

  return (
    <div className='flex h-[calc(100dvh-4rem)]'>
      <Sidebar
        conversations={conversations}
        activeConversationId={selectedChat}
        onSelectConversation={selectCurrentChat}
        onNewChat={createNewChat}
        onDeleteConversation={deleteChat}
        isLoading={isLoadingConversations}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main area */}
      <div className='flex flex-col flex-1 min-h-0'>
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
