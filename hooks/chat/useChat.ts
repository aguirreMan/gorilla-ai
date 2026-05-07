import { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { chatReducer } from '@/lib/chat/chatReducer'
import { Conversation, StreamingResponse, Message} from '@/types/chatTypes'

export function useChat() {
  const [state, dispatch] = useReducer(chatReducer, {
    conversations: [],
    conversationStore: {},
    selectedChat: null,
    isLoadingConversations: false,
    isLoadingMessages: false,
  })

  const [isStreaming, setStreaming] = useState(false)
  const abortController = useRef<AbortController | null>(null)
  const conversationStoreRef = useRef(state.conversationStore)

  useEffect(() => {
    conversationStoreRef.current = state.conversationStore
  }, [state.conversationStore])

  const activeMessages = state.selectedChat
    ? state.conversationStore[state.selectedChat] ?? []
    : []

  const createNewChat = useCallback(() => {
    const newChat: Conversation = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      created_at: new Date().toISOString()
    }
    dispatch({ type: 'NEW_CHAT', payload: newChat })
  }, [])

  const selectCurrentChat = useCallback(async(chatId: string) => {
    dispatch({ type: 'SELECT_CHAT', payload: chatId })

    if (chatId in state.conversationStore) return

    if (abortController.current) abortController.current.abort()
    abortController.current = new AbortController()

    dispatch({ type: 'SET_LOADING_MESSAGES', payload: true })
    try {
      const response = await fetch(`/api/conversations/${chatId}/messages`, { signal: abortController.current.signal })
      const data: { messages: Message[] } = await response.json()
      dispatch({ type: 'LOAD_MESSAGES', payload: { id: chatId, messages: data.messages } })
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return
      console.error('Failed to load messages', error)
    } finally {
      dispatch({ type: 'SET_LOADING_MESSAGES', payload: false })
    }
  }, [state.conversationStore])

  const deleteChat = useCallback(async (chatId: string) => {
    try {
      const response = await fetch(`/api/conversations/${chatId}`, { method: 'DELETE' })
      if(!response.ok) throw new Error('Failed to delete chat')
      dispatch({ type: 'DELETE_CHAT', payload: chatId })
    } catch (error) {
      console.error('Failed to delete chat', error)
    }
  }, [])

  const deselectChat = useCallback(() => {
    if(abortController.current) abortController.current.abort()
    dispatch({ type: 'DESELECT_CHAT' })
  }, [])

  useEffect(() => {
     async function loadConversations() {
        dispatch({ type: 'SET_LOADING_CONVERSATIONS', payload: true })
       try {
         const response = await fetch('/api/conversations')
         const data: { conversations: Conversation[] } = await response.json()
         dispatch({ type: 'LOAD_CONVERSATIONS', payload: data.conversations })
       } catch (error) {
         console.error('Failed to load your conversations', error)
       } finally {
         dispatch({ type: 'SET_LOADING_CONVERSATIONS', payload: false })
       }
     }
     loadConversations()
   }, [])


  async function userSendsMessage(message: string) {
    if(isStreaming) return
    let conversationId = state.selectedChat

    if (!conversationId) {
      const generateNewChat = {
        id: crypto.randomUUID(),
        title: message,
        created_at: new Date().toISOString()
      }
      dispatch({ type: 'NEW_CHAT', payload: generateNewChat })
      conversationId = generateNewChat.id

    }

    const currentMessages = state.conversationStore[conversationId] ?? []

    const updateMessages = [...currentMessages, { role: 'user' as const, content: message }]
    // user message
    dispatch({ type: 'ADD_USER_MESSAGE', payload: { id: conversationId, message } })

    // assistant message
    dispatch({ type: 'ADD_ASSISTANT_MESSAGE', payload: { id: conversationId } })

    setStreaming(true)

    if(abortController.current) abortController.current.abort()
    abortController.current = new AbortController()
    const abortSignal = abortController.current.signal

    try {
      const response = await fetch('/api/openrouter', {
        method: 'POST',
        signal: abortSignal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          { model: 'anthropic/claude-sonnet-4-5', messages: updateMessages, conversationId: conversationId }),
      })

      if (!response.ok) throw new Error('Failed to connect to the ai service')

      if (!response.body) throw new Error('No response body')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let done = false

      while (!done) {
        const messageResult = await reader?.read()
        done = messageResult?.done ?? true

        if (abortSignal.aborted) {
          await reader.cancel()
          return
        }

        buffer += decoder.decode(messageResult?.value ?? new Uint8Array(), { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''


        for (const line of lines) {
          if(line.startsWith('data:')) {
            const json = line.slice(5).trim()
            if (json === '[DONE]') {
              done = true
              break
            }

            const parsedMessage: StreamingResponse = JSON.parse(json)
          const content = parsedMessage.content

            if (content) {
             dispatch({ type: 'STREAM_MESSAGE', payload: { id: conversationId, content } })
            }
          }
        }
      }

    } catch (error) {
     if(error instanceof Error && error.name === 'AbortError') {
       const messageHistory = conversationStoreRef.current[conversationId] ?? []
       const lastMessage = messageHistory[messageHistory.length - 1]

       if (lastMessage?.role === 'assistant' && !lastMessage.content) {
         dispatch({ type: 'REMOVE_LAST_MESSAGE', payload: { id: conversationId } })
       }
     }
    } finally {
      setStreaming(false) // This will be overridden by stopStreaming if aborted
    }
  }

  const stopStreaming = useCallback(() => {
    abortController.current?.abort()
    setStreaming(false)
  }, [])

  useEffect(() => {
    return () => {
      if (abortController.current) {
        abortController.current.abort()
      }
    }
  }, [])

  return {
    conversations: state.conversations,
    selectedChat: state.selectedChat,
    messages: activeMessages,
    isLoadingConversations: state.isLoadingConversations,
    isLoadingMessages: state.isLoadingMessages,
    createNewChat,
    selectCurrentChat,
    deleteChat,
    sendMessage: userSendsMessage,
    isStreaming,
    stopStreaming,
    deselectChat,
  }
}
