'use client'
import { useEffect, useRef } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Message } from '../../types/chatTypes'
import { cn } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './Codeblock'

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
          Debug code, learn faster, and keep shipping
        </p>
        <p className='text-sm text-muted-foreground'>
          Built for developers who want answers fast
        </p>
      </div>
    )
  }

  function renderUserMessage(content: string) {
    const parts = content.split(/(```[\s\S]*?```)/g)
    return parts.map((part, i) => {
      const codeMatch = part.match(/^```(\w*)\n?([\s\S]*?)```$/)
      if (codeMatch) {
        const language = codeMatch[1] || 'text'
        const code = codeMatch[2].replace(/\n$/, '')
        return <CodeBlock key={i} language={language} code={code} />
      }
      return <span key={i} className='whitespace-pre-wrap'>{part}</span>
    })
  }

  const chatComponents = {
    p({ children }: { children?: React.ReactNode }) {
      return <div className='mb-4 last:mb-0'>{children}</div>
    },

    code({
      inline,
      className,
      children,
    }: {
      inline?: boolean
      className?: string
      children?: React.ReactNode
    }) {
      if (inline) {
        return (
          <code className='bg-surface px-1.5 py-0.5 rounded-sm text-sm glow-sm'>
            {children}
          </code>
        )
      }
      const match = /language-(\w+)/.exec(className || '')
       const language = match ? match[1] : 'plaintext'
       const code = String(children).replace(/\n$/, '')

      return <CodeBlock language={language} code={code} />
    },
  }

  return (
    <div className='overflow-y-auto min-h-0 flex-1'>
      <div className='max-w-4xl mx-auto space-y-6 pt-8'>
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
                  'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed border text-foreground',
                  msg.role === 'user'
                    ? 'bg-accent rounded-tr-sm'
                    : 'bg-card rounded-tl-sm'
                )}
            >
              {msg.role === 'user' ? (
                renderUserMessage(msg.content)
              ) : (
                <ReactMarkdown components={chatComponents}>
                  {msg.content}
                </ReactMarkdown>
              )}

              </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className='flex gap-3 flex-row'>
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className='text-xs font-semibold text-foreground bg-primary'>
                G
              </AvatarFallback>
            </Avatar>
            <div className='rounded-2xl rounded-tl-sm px-4 py-3 border bg-card'>
              <div className='flex gap-1 items-center h-4'>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className='w-1.5 h-1.5 rounded-full animate-bounce bg-secondary'
                    style={{ animationDelay: `${i * 0.15}s`}}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
