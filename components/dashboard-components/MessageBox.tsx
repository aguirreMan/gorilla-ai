'use client'
import { useEffect, useRef } from 'react'
//import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Message } from '../../types/chatTypes'
import { cn } from '@/lib/utils'

interface MessageBoxProps {
  messages: Message[]
  isLoading?: boolean
}

export default function MessageBox({ messages, isLoading }: MessageBoxProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' })
  }, [messages, isLoading])

  if (messages.length === 0) {
    return (
      <div className='flex-1 flex flex-col items-center justify-center gap-2'>
        <p className='text-2xl font-semibold text-foreground'>
          What can I help you with?
        </p>
        <p className='text-sm text-muted-foreground'>
          Start a conversation below
        </p>
      </div>
    )
  }

  return (
      <div className='max-w-2xl mx-auto space-y-6 pb-24'>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <Avatar className='h-8 w-8 shrink-0'>
              <AvatarFallback
                className={cn(
                  'text-xs font-semibold text-foreground',
                  msg.role === 'user' ? 'bg-primary' : 'bg-secondary'
                )}
              >
                {msg.role === 'user' ? 'U' : 'G'}
              </AvatarFallback>
            </Avatar>

            {/* Bubble */}
            <div
              className={cn(
                'max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed border text-foreground',
                msg.role === 'user'
                  ? 'bg-accent rounded-tr-sm'
                  : 'bg-card rounded-tl-sm'
              )}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className='flex gap-3 flex-row'>
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className='text-xs font-semibold text-foreground bg-secondary'>
                G
              </AvatarFallback>
            </Avatar>
            <div className='rounded-2xl rounded-tl-sm px-4 py-3 border bg-card'>
              <div className='flex gap-1 items-center h-4'>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className='w-1.5 h-1.5 rounded-full animate-bounce bg-muted-foreground'
                    style={{ animationDelay: `${i * 0.15}s`}}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
  )
}
