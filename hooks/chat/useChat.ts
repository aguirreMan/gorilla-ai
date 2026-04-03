//import { useReducer } from 'react'
import {  Chatstate, Conversation } from '@/types/chatTypes'

export type ChatActions =
 | { type: 'NEW_CHAT'; payload: Conversation }
 | { type: 'SELECT_CHAT'; payload: string }
 | { type: 'DELETE_CHAT'; payload: string }
 | { type: 'ADD_USER_MESSAGE'; payload: { id: string; message: string } }
 | { type: 'ADD_ASSISTANT_MESSAGE'; payload: { id: string } }
 | { type: 'STREAM_MESSAGE'; payload: { id: string; content: string } }
 | { type: 'SET_LOADING'; payload: boolean }


export function chatReducer(state: Chatstate, action: ChatActions): Chatstate {
  switch (action.type) {
    case 'NEW_CHAT':
      return {
        ...state,
        conversations: [
          ...state.conversations,
          {
            id: action.payload.id,
            title: action.payload.title,
            created_at: action.payload.created_at,
          },
        ],
        conversationStore: {
          ...state.conversationStore,
          [action.payload.id]: [],
        },
        selectedChat: action.payload.id,
      }
    case 'SELECT_CHAT':
      return {
        ...state,
        selectedChat: action.payload,
      }
    case 'DELETE_CHAT':
      const newStore = { ...state.conversationStore }
      delete newStore[action.payload]
      return {
        ...state,
        conversations: state.conversations.filter((conversation) => conversation.id !== action.payload),
        conversationStore: newStore,
        selectedChat: state.selectedChat === action.payload ? null : state.selectedChat,
      }
    case 'ADD_USER_MESSAGE':
      return {
        ...state,
        conversationStore: {
          ...state.conversationStore,
          [action.payload.id]: [
            ...(state.conversationStore[action.payload.id] ?? []),
            { role: 'user', content: action.payload.message },
          ],
        },
      }
    case 'ADD_ASSISTANT_MESSAGE':
      return {
        ...state,
        conversationStore: {
          ...state.conversationStore,
          [action.payload.id]: [
            ...(state.conversationStore[action.payload.id] ?? []),
            {role: 'assistant', content: ''}
          ],
        },
      }
      case 'STREAM_MESSAGE': {
        const convo = state.conversationStore[action.payload.id] ?? []
        const last = convo[convo.length - 1]
        if (!last) return state
        return {
          ...state,
          conversationStore: {
            ...state.conversationStore,
            [action.payload.id]: [
              ...convo.slice(0, -1),
              { ...last, content: last.content + action.payload.content },
            ],
          },
        }
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
