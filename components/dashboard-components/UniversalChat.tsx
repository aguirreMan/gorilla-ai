'use client'
import { useRef, useState, KeyboardEvent } from 'react'
import { ArrowUp, Square } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface UniversalChatProps {
  onSend?: (message: string) => void
  isStreaming?: boolean
  placeholder?: string
  stopStreaming?: () => void
}

export default function UniversalChat({
  onSend,
  placeholder = 'What are we learning or building today?',
  isStreaming = false,
  stopStreaming
}: UniversalChatProps) {
  const [userInput, setUserInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const canSend = userInput.trim().length > 0

  function sendToOpenRouter() {
    onSend?.(userInput.trim())
    setUserInput('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
    textareaRef.current?.focus()
  }

  function handleAction() {
    if (isStreaming) {
      stopStreaming?.()
    } else {
      if (canSend) sendToOpenRouter()
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!isStreaming) sendToOpenRouter()
    }
  }

  return (
    <div className={cn(
      'relative flex flex-col gap-0 w-full max-w-3xl mx-auto',
      'rounded-xl border',
      'shadow-[0_4px_32px_rgba(0,0,0,0.45)]',
      'transition-shadow duration-200',
      'focus-within:shadow-[0_4px_40px_rgba(77,123,147,0.18)]',
    )}>
      <Textarea
        ref={textareaRef}
        value={userInput}
        onChange={(e) => {
          setUserInput(e.target.value)
          e.target.style.height = 'auto'
          e.target.style.height = `${e.target.scrollHeight}px`
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isStreaming}
        className={cn(
          'resize-none max-h-48 overflow-y-auto w-full',
          'bg-transparent border-none shadow-none',
          'rounded-xl rounded-b-none',
          'px-4 pt-4 pb-4',
          'text-foreground text-sm leading-relaxed',
          'focus-visible:ring-0 focus-visible:border-none',
          'disabled:opacity-60',
        )}
      />
      <div className='flex items-center justify-between px-4 sm:px-7 pb-3 pt-1'>
        <span className='text-xs text-muted-foreground select-none pl-1'>
          {isStreaming ? 'Generating…' : 'Shift + Enter for new line'}
        </span>
        <Button
          size='icon-sm'
          onClick={handleAction}
          disabled={!isStreaming && !canSend}
          aria-label={isStreaming ? 'Stop generation' : 'Send message'}
          className={cn(
            'rounded-lg transition-all duration-150',
            (canSend || isStreaming)
              ? 'bg-primary text-primary-foreground hover:bg-primary/85 cursor-pointer'
              : 'bg-muted text-muted-foreground cursor-not-allowed',
          )}
        >
          {isStreaming ? (
            <Square className='size-3.5 fill-current' />
          ) : (
            <ArrowUp className='size-4' strokeWidth={2.5} />
          )}
        </Button>
      </div>
    </div>
  )
}
