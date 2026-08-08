'use client'

import { SidebarSkeleton } from '@/components/dashboard-components/SidebarSkeleton'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { MessageSquare, Trash2, SquarePen } from 'lucide-react'
//import { Conversation } from '@/types/chatTypes'
import { useClerk, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useFetchConversations } from '@/hooks/chat/useFetchConversations'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'


interface SidebarProps {
  //conversations: Conversation[]
  activeConversationId: string | null
  onSelectConversation: (id: string) => void
  onNewChat: () => void
  onDeleteConversation?: (id: string) => void
  //isLoading: boolean
  isOpen: boolean
  onClose: () => void
}

export default function UniversalSidebar({
  //conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  //isLoading,
  isOpen,
  onClose
}: SidebarProps) {

  const { signOut } = useClerk()
  const { user, isLoaded } = useUser()
  const { data, isLoading, error } = useFetchConversations()
  const router = useRouter()

  async function redirectSignOut() {
    await signOut({ redirectUrl: '/' })
  }

  function handleConversationSelect(chatId: string) {
    console.log('clicked:', chatId)
    router.push(`/dashboard/${chatId}`)
    onClose()
  }

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden' onClick={onClose} />
      )}


      {/*Side bar area */}
      <div className={cn('w-72 h-full flex flex-col bg-surface border-r border-border shrink-0 transition-transform duration-300 ease-in-out',
              // Mobile styles: fixed drawer tracking isOpen state
        'fixed inset-y-0 left-0 z-50 md:static md:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>


      <div className='flex items-center gap-3 px-3 py-3 shrink-0'>
        <Avatar className='h-7 w-7 shrink-0'>
          {isLoaded && (
            <AvatarImage src={user?.imageUrl} alt={user?.fullName ?? undefined} />
          )}
          <AvatarFallback className='text-xs font-semibold bg-primary text-primary-foreground'>
            {isLoaded ? (user?.firstName?.[0]?.toUpperCase() ?? 'U') : 'U'}
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col min-w-0'>
          <span className='text-sm font-semibold text-muted-foreground truncate'>
            {isLoaded ? user?.firstName : ''}
          </span>
          <span className='text-xs text-muted-foreground truncate'>
            {isLoaded ? user?.primaryEmailAddress?.emailAddress : ''}
          </span>
        </div>
      </div>

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
        <SidebarSkeleton />
      ) : (
        <div className='flex-1 overflow-hidden px-2 py-2'>
          {data?.conversations.length === 0 ? (
            <p className="text-xs text-center mt-8 px-4 text-muted-foreground">
              No chats yet. Start a new conversation.
            </p>
          ) : (
            <div className='space-y-0.5'>
              {data?.conversations.map((convo) => (
                <div
                  key={convo.id}
                  className={`group/row relative flex items-center justify-between rounded-md px-2 py-2 cursor-pointer transition-colors hover:bg-muted
                    ${
                      activeConversationId === convo.id
                        ? 'bg-accent text-foreground border-l-2 border-primary pl-1.5'
                        : 'text-muted-foreground border-l-2 border-transparent'
                    }`}
                  onClick={() => handleConversationSelect(convo.id)}
                >
                  <MessageSquare size={14} className="shrink-0 mr-2 opacity-60" />
                  <span className='text-sm truncate flex-1 min-w-0'>{convo.title}</span>

                  {onDeleteConversation && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='ml-1 h-6 w-6 shrink-0 p-0 opacity-0 group-hover/row:opacity-100 transition-opacity
                          hover:bg-destructive/15 hover:text-destructive'
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Trash2 size={12} />
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete conversation?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this chat.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDeleteConversation(convo.id)}
                            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
  </>
  )
}
