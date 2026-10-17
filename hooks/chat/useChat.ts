import { useState, useEffect, useRef, useReducer } from 'react'
import { chatReducer } from '@/lib/chat/chatReducer'
import { useFetchMessages } from '@/hooks/chat/useFetchMessages'
import { useSyncMessages } from '@/hooks/chat/useSyncMessages'
import { readStream } from '@/lib/chat/readStream'

export function useChat(chatId: string | null) {
  const [pendingMessages, dispatch] = useReducer(chatReducer, [])
  const { syncMessages } = useSyncMessages()

  const { messages: fetchedMessages, isLoading, error } = useFetchMessages(chatId)

  const [isStreaming, setStreaming] = useState(false)
  const abortController = useRef<AbortController | null>(null)

  const displayMessages = [...fetchedMessages, ...pendingMessages]


  useEffect(() => {
    abortController.current?.abort()
    abortController.current = null
    dispatch({ type: 'RESET_PENDING_MESSAGES' })
  }, [chatId])

  function stopStreaming() {
    abortController.current?.abort()
    setStreaming(false)
  }


  async function sendMessage(message: string) {
    if (isStreaming) return

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

      await readStream({
        body: response.body, onContentChange: (content) => {
          dispatch({ type: 'APPEND_STREAM_CONTENT', payload: { content } })
        }
      })

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        dispatch({ type: 'REMOVE_EMPTY_ASSISTANT_MESSAGE' })
      }
    } finally {
      setStreaming(false)

      await syncMessages(chatId)

      dispatch({ type: 'RESET_PENDING_MESSAGES' })

    }
  }

  return {
    messages: displayMessages,
    isLoading,
    error,
    sendMessage,
    isStreaming,
    stopStreaming
  }
}
