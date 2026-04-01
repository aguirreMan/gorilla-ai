'use client'
import { useEffect, useRef } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface MessageBoxProps {
  messages: Message[]
  isLoading?: boolean
}

export default function MessageBox({ messages, isLoading }: MessageBoxProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <p
          className="text-2xl font-semibold"
          style={{ color: 'var(--foreground)' }}
        >
          What can I help you with?
        </p>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          Start a conversation below
        </p>
      </div>
    )
  }

  return (
    <ScrollArea className="flex-1 px-4 py-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback
                className="text-xs font-semibold"
                style={{
                  backgroundColor:
                    msg.role === 'user' ? 'var(--primary)' : 'var(--secondary)',
                  color: 'var(--foreground)',
                }}
              >
                {msg.role === 'user' ? 'U' : 'G'}
              </AvatarFallback>
            </Avatar>

            {/* Bubble */}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'
              }`}
              style={{
                backgroundColor:
                  msg.role === 'user' ? 'var(--accent)' : 'var(--card)',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex gap-3 flex-row">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback
                className="text-xs font-semibold"
                style={{
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--foreground)',
                }}
              >
                G
              </AvatarFallback>
            </Avatar>
            <div
              className="rounded-2xl rounded-tl-sm px-4 py-3"
              style={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
              }}
            >
              <div className="flex gap-1 items-center h-4">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full animate-bounce"
                    style={{
                      backgroundColor: 'var(--muted-foreground)',
                      animationDelay: `${i * 0.15}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  )
}
