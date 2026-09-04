import { useState, useEffect, useRef, useReducer } from 'react'
import { chatReducer } from '@/lib/chat/chatReducer'
import type { StreamingResponse } from '@/types/chatTypes'
import { useFetchMessages } from '@/hooks/chat/useFetchMessages'

export function useChat(chatId: string | null) {
  const [pendingMessages, dispatch] = useReducer(chatReducer, [])

  const { messages: fetchedMessages, isLoading, error } = useFetchMessages(chatId)

  const [isStreaming, setStreaming] = useState(false)
  const abortController = useRef<AbortController | null>(null)

  const displayMessages = [...fetchedMessages, ...pendingMessages]

  useEffect(() => {
    abortController.current?.abort()
    dispatch({ type: 'RESET_PENDING_MESSAGES' })
  }, [chatId])

  async function sendMessage(message: string) {
    if (isStreaming || !chatId) return

    const updatedMessages = [...displayMessages, { role: 'user' as const, content: message }]

    dispatch({ type: 'ADD_USER_MESSAGE', payload: { message } })
    dispatch({ type: 'ADD_ASSISTANT_MESSAGE' })

    setStreaming(true)

    if (abortController.current) abortController.current.abort()
    abortController.current = new AbortController()

    try {
      const response = await fetch('/api/openrouter', {
        method: 'POST',
        signal: abortController.current.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'anthropic/claude-sonnet-4-5',
          messages: updatedMessages,
          conversationId: chatId,
        }),
      })
      if (!response.ok || !response.body) throw new Error('Stream connection failed')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let finishedStreaming = false

      while (!finishedStreaming) {
        const messageResults = await reader.read()
        finishedStreaming = messageResults?.done ?? true
        buffer += decoder.decode(messageResults?.value ?? new Uint8Array(), { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data:')) {
            const json = line.slice(5).trim()
            if (json === '[DONE]') {
              finishedStreaming = true
              break
            }
            if (json) {
              const parsed: StreamingResponse = JSON.parse(json)
              if (parsed.content) {
                dispatch({ type: 'APPEND_STREAM_CONTENT', payload: { content: parsed.content } })
              }
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        dispatch({ type: 'REMOVE_EMPTY_ASSISTANT_MESSAGE' })
      }
    } finally {
      setStreaming(false)
    }
  }


  return {
    messages: displayMessages,
    isLoading,
    error,
    sendMessage,
    isStreaming,
  }
}
