'use client'
import { useUser } from '@clerk/nextjs'
import UniversalChat from '@/components/dashboard-components/UniversalChat'
import UniversalSidebar from '@/components/dashboard-components/UniversalSidebar'
import MessageBox from '@/components/dashboard-components/MessageBox'
import { useChat } from '@/hooks/chat/useChat'

export default function DashboardPage() {
  const { isSignedIn, isLoaded } = useUser()

  const {
    conversations,
    messages,
    isLoading: chatIsLoading,
    selectedChat,
    createNewChat,
    selectCurrentChat,
    deleteChat,
    sendMessage } = useChat()

  if (!isLoaded) return <div>Loading...</div>
  if (!isSignedIn) return null

  return (
    <div className='flex h-[calc(100vh-4rem)]'>
      <UniversalSidebar
        conversations={conversations}
        activeConversationId={selectedChat}
        onSelectConversation={selectCurrentChat}
        onNewChat={createNewChat}
        onDeleteConversation={deleteChat}
        isLoading={chatIsLoading}
      />

      {/* Main area */}
      <div className='flex flex-col flex-1 min-h-0'>
        <MessageBox messages={messages} isLoading={chatIsLoading} />
          <div className='px-4 py-3 border-t bg-background sticky bottom-0'>
            <UniversalChat onSend={sendMessage} isLoading={chatIsLoading} />
          </div>
      </div>
    </div>
  )
}
