'use client'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { MessageSquare, Trash2, ImageIcon, SquarePen } from 'lucide-react'
import Link from 'next/link'
import { Conversation } from '@/types/chatTypes'
import { useClerk } from '@clerk/nextjs'


interface UniversalSidebarProps {
  conversations: Conversation[]
  activeConversationId: string | null
  onSelectConversation: (id: string) => void
  onNewChat: () => void
  onDeleteConversation?: (id: string) => void
}

export default function UniversalSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
}: UniversalSidebarProps) {

  const { signOut } = useClerk()

  async function redirectSignOut() {
     await signOut({ redirectUrl: '/' })
  }

  return (
    <div className="w-72 h-screen fixed left-0 top-0 flex flex-col bg-background border-r border-border">
      {/* Header */}
      <div className="px-3 py-4 flex items-center justify-between">
        <span className="text-sm font-semibold tracking-widest uppercase text-foreground">
          Gorilla AI
        </span>
      </div>

      <Separator />

      {/* Navigation links */}
      <div className="px-2 py-2 flex flex-col gap-0.5">
        <Button asChild variant='ghost' className='w-full justify-start gap-2 text-sm font-normal text-muted-foreground hover:text-foreground'>
          <Link href='/images'>
            <ImageIcon size={16} />
            Images
          </Link>
        </Button>
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
      <ScrollArea className='flex-1 min-h-0 px-2 py-2'>
        {conversations.length === 0 ? (
          <p className="text-xs text-center mt-8 px-4 text-muted-foreground">
            No chats yet. Start a new conversation.
          </p>
        ) : (
          <div className="space-y-0.5">
            {conversations.map((convo) => (
              <div
                key={convo.id}
                className={`group relative flex items-center rounded-md px-2 py-2 cursor-pointer transition-colors hover:bg-muted ${
                  activeConversationId === convo.id
                    ? 'bg-accent text-foreground'
                    : 'text-muted-foreground'
                }`}
                onClick={() => onSelectConversation(convo.id)}
              >
                <MessageSquare size={14} className="shrink-0 mr-2 opacity-60" />
                <span className="text-sm truncate flex-1">{convo.title}</span>

                {/* Delete button - shows on hover */}
                {onDeleteConversation && (
                  <Button
                    className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 p-0.5 rounded hover:text-destructive"
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
      </ScrollArea>

      <Separator />

      {/* Footer */}
      <div className='p-3 mt-auto'>
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
