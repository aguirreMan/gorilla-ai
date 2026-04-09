import { useReducer } from 'react'
import { chatReducer } from '@/lib/chat/chatReducer'
import { Conversation, StreamingResponse} from '@/types/chatTypes'

export function useChat() {
  const [state, dispatch] = useReducer(chatReducer, {
    conversations: [],
    conversationStore: {},
    selectedChat: null,
    isLoading: false,
  })

  function createNewChat() {
    const newChat: Conversation = {
      id: crypto.randomUUID().toString(),
      title: 'New Chat',
      created_at: new Date().toISOString()
    }
    dispatch({ type: 'NEW_CHAT', payload: newChat })
  }

  function selectCurrentChat(chatId: string) {
    const chatExists = state.conversations.some((chat) => chat.id === chatId)
    if (chatExists) {
      dispatch({ type: 'SELECT_CHAT', payload: chatId })
    }
  }

  function deleteChat(chatId: string) {
    dispatch({ type: 'DELETE_CHAT', payload: chatId })
  }

  async function userSendsMessage(message: string) {
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
    // user message
    dispatch({ type: 'ADD_USER_MESSAGE', payload: { id: conversationId, message } })

    // assistant message
    dispatch({ type: 'ADD_ASSISTANT_MESSAGE', payload: { id: conversationId } })
    dispatch({ type: 'SET_LOADING', payload: true })

    try {
      const response = await fetch('/api/openrouter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      let done = false
      while (!done) {
        const messageResult = await reader?.read()
        done = messageResult?.done ?? true

        const chunk = decoder.decode(messageResult?.value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if(line.startsWith('data:')) {
            const json = line.slice(5).trim()
            if(json === '[DONE]') break
            const parsedMessage: StreamingResponse = JSON.parse(json)
            const content = parsedMessage.choices?.[0]?.delta?.content

            if (content) {
             dispatch({ type: 'STREAM_MESSAGE', payload: { id: conversationId, content } })
            }
          }
        }
      }

    } catch (error) {
      console.error(error)
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }


  return { state, createNewChat, selectCurrentChat, deleteChat, userSendsMessage }
}
