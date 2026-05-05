'use client'
import { useUser } from '@clerk/nextjs'
import UniversalChat from '@/components/dashboard-components/UniversalChat'
import UniversalSidebar from '@/components/dashboard-components/UniversalSidebar'
import MessageBox from '@/components/dashboard-components/MessageBox'
import DashboardSkeleton from '@/components/dashboard-components/DashboardSkeleton'
import { useChat } from '@/hooks/chat/useChat'

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
    isStreaming } = useChat()

  if (!isLoaded) return <DashboardSkeleton />
  if (!isSignedIn) return null

  return (
    <div className='flex h-[calc(100vh-4rem)]'>
      <UniversalSidebar
        conversations={conversations}
        activeConversationId={selectedChat}
        onSelectConversation={selectCurrentChat}
        onNewChat={createNewChat}
        onDeleteConversation={deleteChat}
        isLoading={isLoadingConversations}
      />

      {/* Main area */}
      <div className='flex flex-col flex-1 min-h-0'>
        <MessageBox messages={messages} isStreaming={isStreaming} isLoadingMessages={isLoadingMessages} />
          <div className='px-4 py-3 border-t bg-background sticky bottom-0'>
            <UniversalChat onSend={sendMessage} isStreaming={isStreaming} />
          </div>
      </div>
    </div>
  )
}
