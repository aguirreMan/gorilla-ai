'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { MessageSquare, Trash2, SquarePen } from 'lucide-react'
import { Conversation } from '@/types/chatTypes'
import { useClerk } from '@clerk/nextjs'


interface UniversalSidebarProps {
  conversations: Conversation[]
  activeConversationId: string | null
  onSelectConversation: (id: string) => void
  onNewChat: () => void
  onDeleteConversation?: (id: string) => void
  isLoading: boolean
}

export default function UniversalSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  isLoading
}: UniversalSidebarProps) {

  const { signOut } = useClerk()

  async function redirectSignOut() {
     await signOut({ redirectUrl: '/' })
  }


  return (
    <div className='w-72 h-full flex flex-col bg-surface border-r border-border shrink-0'>
      <Separator />
      {/* Navigation links */}
      <div className='px-2 py-2 flex flex-col gap-0.5 shrink-0'>
        <Button
          variant='ghost'
          className='w-full justify-start gap-2 text-sm font-normal text-muted-foreground hover:text-foreground'
          onClick={onNewChat}
        >
          <SquarePen size={16} />
          New Chat
        </Button>
      </div>

      <Separator />

      {/* Conversation list */}
      {isLoading ? (
        <div className='space-y-1 px-2 py-2'>
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className='h-8 w-full rounded-md' />
          ))}
        </div>
      ) : (
        <div className='flex-1 overflow-hidden px-2 py-2'>
          {conversations.length === 0 ? (
            <p className="text-xs text-center mt-8 px-4 text-muted-foreground">
              No chats yet. Start a new conversation.
            </p>
          ) : (
            <div className='space-y-0.5'>
              {conversations.map((convo) => (
                <div
                  key={convo.id}
                  className={`group/row relative flex items-center justify-between rounded-md px-2 py-2 cursor-pointer transition-colors hover:bg-muted
                    ${
                      activeConversationId === convo.id
                        ? 'bg-accent text-foreground border-l-2 border-primary pl-[6px]'
                        : 'text-muted-foreground border-l-2 border-transparent'
                    }`}
                  onClick={() => onSelectConversation(convo.id)}
                >
                  <MessageSquare size={14} className="shrink-0 mr-2 opacity-60" />
                  <span className='text-sm truncate flex-1 min-w-0'>{convo.title}</span>

                  {onDeleteConversation && (
                    <Button
                      variant='ghost'
                      size='icon'
                      className='ml-1 h-6 w-6 shrink-0 p-0 opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-destructive/15 hover:text-destructive'
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteConversation(convo.id)
                      }}
                    >
                      <Trash2 size={12} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <Separator />

      {/* Footer */}
      <div className='p-3 shrink-0'>
        <Button
          variant='ghost'
          onClick={redirectSignOut}
          className='w-full justify-start gap-2 text-sm text-muted-foreground border border-border hover:text-destructive hover:bg-destructive/10'
        >
          Sign out
        </Button>
      </div>
    </div>
  )
}
