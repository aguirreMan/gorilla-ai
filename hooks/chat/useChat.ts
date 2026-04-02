import { useReducer } from 'react'
import { Message, ConversationStore, Chatstate } from '@/types/chatTypes'

export type ChatActions =
 | { type: 'NEW_CHAT'; payload: { id: string;  title: string} }
 | { type: 'SELECT_CHAT'; payload: string }
 | { type: 'DELETE_CHAT'; payload: string }
 | { type: 'ADD_USER_MESSAGE'; payload: { id: string; message: Message } }
 | { type: 'ADD_ASSISTANT_MESSAGE'; payload: { id: string } }
 | { type: 'STREAM_MESSAGE'; payload: { id: string; content: string } }
 | { type: 'SET_LOADING'; payload: boolean }


function chatReducer(state: Chatstate, action: ChatActions): Chatstate {
  switch (action.type) {
    case 'NEW_CHAT':
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.payload.id]: {
            id: action.payload.id,
            title: action.payload.title,
            messages: [],
          },
        },
        selectedChat: action.payload.id,
      }
    case 'SELECT_CHAT':
      return {
        ...state,
        selectedChat: action.payload,
      }
    case 'DELETE_CHAT':
      const { [action.payload]: deleted, ...rest } = state.conversations
      return {
        ...state,
        conversations: rest,
        selectedChat: null,
      }
    case 'ADD_USER_MESSAGE':
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.payload.id]: {
            ...state.conversations[action.payload.id],
            messages: [
              ...state.conversations[action.payload.id].messages,
              { ...action.payload.message, role: 'user' },
            ],
          },
        },
      }
    case 'ADD_ASSISTANT_MESSAGE':
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.payload.id]: {
            ...state.conversations[action.payload.id],
            messages: [
              ...state.conversations[action.payload.id].messages,
              { role: 'assistant', content: '' },
            ],
          },
        },
      }
    case 'STREAM_MESSAGE':
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.payload.id]: {
            ...state.conversations[action.payload.id],
            messages: [
              ...state.conversations[action.payload.id].messages.slice(0, -1),
              { ...state.conversations[action.payload.id].messages.slice(-1)[0], content: action.payload.content },
            ],
          },
        },
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }
    default:
      return state
  }
}

export function useChat() {
  const [state, dispatch] = useReducer(chatReducer, {
    conversations: {},
    selectedChat: null,
    isLoading: false,
  })
  return { state, dispatch }
}
