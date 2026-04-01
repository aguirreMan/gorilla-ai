'use client'
import { useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SquarePen, MessageSquare, Trash2 } from 'lucide-react'

export interface Conversation {
  id: string
  title: string
  created_at: Date
}

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
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div
      className='w-72 h-screen fixed left-0 top-0 flex flex-col'
      style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
    >
      {/* Header */}
      <div className="px-3 py-4 flex items-center justify-between">
        <span
          className="text-sm font-semibold tracking-widest uppercase"
          style={{ color: 'var(--muted-foreground)' }}
        >
          Gorilla AI
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onNewChat}
          className="h-8 w-8 cursor-pointer"
          style={{ color: 'var(--muted-foreground)' }}
          title="New chat"
        >
          <SquarePen size={16} />
        </Button>
      </div>

      <Separator style={{ backgroundColor: 'var(--border)' }} />

      {/* Conversation list */}
      <ScrollArea className="flex-1 px-2 py-2">
        {conversations.length === 0 ? (
          <p
            className="text-xs text-center mt-8 px-4"
            style={{ color: 'var(--muted-foreground)' }}
          >
            No chats yet. Start a new conversation.
          </p>
        ) : (
          <div className="space-y-0.5">
            {conversations.map((convo) => (
              <div
                key={convo.id}
                className="group relative flex items-center rounded-md px-2 py-2 cursor-pointer transition-colors"
                style={{
                  backgroundColor:
                    activeConversationId === convo.id
                      ? 'var(--accent)'
                      : hoveredId === convo.id
                      ? 'var(--muted)'
                      : 'transparent',
                  color:
                    activeConversationId === convo.id
                      ? 'var(--foreground)'
                      : 'var(--muted-foreground)',
                }}
                onClick={() => onSelectConversation(convo.id)}
                onMouseEnter={() => setHoveredId(convo.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <MessageSquare size={14} className="shrink-0 mr-2 opacity-60" />
                <span className="text-sm truncate flex-1">{convo.title}</span>

                {/* Delete button - shows on hover */}
                {onDeleteConversation && (
                  <button
                    className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 p-0.5 rounded hover:text-red-400"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteConversation(convo.id)
                    }}
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <Separator style={{ backgroundColor: 'var(--border)' }} />

      {/* Footer - placeholder for user info later */}
      <div className="px-3 py-3">
        <p className="text-xs truncate" style={{ color: 'var(--muted-foreground)' }}>
          More options coming soon
        </p>
      </div>
    </div>
  )
}
