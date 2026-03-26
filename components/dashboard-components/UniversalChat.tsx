'use client'

import { useRef, useState, KeyboardEvent } from 'react'
import { ArrowUp, Square } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface UniversalChatProps {
  onSend?: (message: string) => void
  isLoading?: boolean
  placeholder?: string
}

export default function UniversalChat({
  onSend,
  isLoading = false,
  placeholder = 'Ask Gorilla AI anything…',
}: UniversalChatProps) {
  const [userInput, setUserInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const canSend = userInput.trim().length > 0 && !isLoading

  function handleSend() {
    if (!canSend) return
    onSend?.(userInput.trim())
    setUserInput('')
    textareaRef.current?.focus()
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      className={cn(
        'relative flex flex-col gap-0 w-full max-w-3xl mx-auto',
        'rounded-xl border',
        'shadow-[0_4px_32px_rgba(0,0,0,0.45)]',
        'transition-shadow duration-200',
        'focus-within:shadow-[0_4px_40px_rgba(77,123,147,0.18)]',
      )}
    >
      {/* Textarea */}
      <Textarea
        ref={textareaRef}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={8}
        disabled={isLoading}
        className={cn(
          'resize-none min-h-[52px] max-h-48 w-full',
          'bg-transparent border-none shadow-none',
          'rounded-xl rounded-b-none',
          'px-4 pt-3.5 pb-2',
          'text-foreground',
          'text-sm leading-relaxed',
          'focus-visible:ring-0 focus-visible:border-none',
          'disabled:opacity-60',
        )}
      />

      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 pb-3 pt-1">
        {/* Left — hint */}
        <span className="text-xs text-muted-foreground select-none pl-1">
          {isLoading ? 'Generating…' : 'Shift + Enter for new line'}
        </span>

        {/* Right — send / stop button */}
        <Button
          size="icon-sm"
          onClick={handleSend}
          disabled={!canSend}
          aria-label={isLoading ? 'Stop generation' : 'Send message'}
          className={cn(
            'rounded-lg transition-all duration-150',
            canSend
              ? 'bg-primary text-primary hover:bg-(--primary)/85 shadow-[0_2px_8px_rgba(77,123,147,0.35)]'
              : 'bg-muted text-muted-foreground cursor-not-allowed shadow-none',
          )}
        >
          {isLoading ? (
            <Square className="size-3.5 fill-current" />
          ) : (
            <ArrowUp className="size-4" strokeWidth={2.5} />
          )}
        </Button>
      </div>
    </div>
  )
}
