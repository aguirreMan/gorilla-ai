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

  const activeRequestRef = useRef<{
    id: string
    conversationId: string
    abortController: AbortController
  } | null>(null)

  function clearIfCurrent(id: string) {
    if (activeRequestRef.current?.id === id) {
      activeRequestRef.current = null
      setStreaming(false)
      dispatch({ type: 'RESET_PENDING_MESSAGES' })
    }
  }

  const displayMessages = [...fetchedMessages, ...pendingMessages]


  useEffect(() => {
    const request = activeRequestRef.current

    if (request?.conversationId === chatId) return

    request?.abortController.abort()
    activeRequestRef.current = null

    dispatch({ type: 'RESET_PENDING_MESSAGES' })
    setStreaming(false)
  }, [chatId])


  function stopStreaming() {
    activeRequestRef.current?.abortController.abort()
    activeRequestRef.current = null
    setStreaming(false)
  }


  async function sendMessage(message: string, targetChatId: string) {
    if (isStreaming) return

    const request = {
      id: crypto.randomUUID(),
      conversationId: targetChatId,
      abortController: new AbortController()
    }

    activeRequestRef.current?.abortController.abort()
    activeRequestRef.current = request

    const effectiveChatId = targetChatId ?? chatId
    const messageHistory = targetChatId === chatId ? displayMessages : []


    const updatedMessages = [...messageHistory, { role: 'user' as const, content: message }]

    if (!chatId || targetChatId === chatId) {
      dispatch({ type: 'ADD_USER_MESSAGE', payload: { message } })
      dispatch({ type: 'ADD_ASSISTANT_MESSAGE' })
    }



    setStreaming(true)

    try {
      const response = await fetch('/api/openrouter', {
        method: 'POST',
        signal: request.abortController.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'anthropic/claude-sonnet-4-5',
          messages: updatedMessages,
          conversationId: effectiveChatId,
        }),
      })
      if (!response.ok || !response.body) throw new Error('Stream connection failed')

      await readStream({
        body: response.body, onContentChange: (content) => {
          dispatch({ type: 'APPEND_STREAM_CONTENT', payload: { content } })
        }
      })

    } catch (error) {
      if (
        activeRequestRef.current?.id === request.id &&
        error instanceof Error &&
        error.name === 'AbortError'
      ) {
        dispatch({ type: 'REMOVE_EMPTY_ASSISTANT_MESSAGE' })
      }
    } finally {

      if (activeRequestRef.current?.id === request.id) {
        await syncMessages(targetChatId)
        clearIfCurrent(request.id)
      }

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
