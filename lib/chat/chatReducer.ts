import { Chatstate, Conversation, Message } from '@/types/chatTypes'

export type ChatActions =
 | { type: 'NEW_CHAT'; payload: Conversation }
 | { type: 'SELECT_CHAT'; payload: string }
 | { type: 'DELETE_CHAT'; payload: string }
 | { type: 'ADD_USER_MESSAGE'; payload: { id: string; message: string } }
 | { type: 'ADD_ASSISTANT_MESSAGE'; payload: { id: string } }
 | { type: 'REMOVE_LAST_MESSAGE'; payload: { id: string } }
 | { type: 'SET_LAST_ERROR_MESSAGE'; payload: { id: string;  error: string} }
 | { type: 'STREAM_MESSAGE'; payload: { id: string; content: string } }
 | { type: 'SET_LOADING_CONVERSATIONS'; payload: boolean }
 | { type: 'SET_LOADING_MESSAGES'; payload: boolean }
 | { type: 'DESELECT_CHAT' }
 | { type: 'LOAD_CONVERSATIONS'; payload: Conversation[] }
 | { type: 'LOAD_MESSAGES'; payload: { id: string; messages: Message[] } }


export function chatReducer(state: Chatstate, action: ChatActions): Chatstate {
  switch (action.type) {
    case 'NEW_CHAT':
      const currentMessages = state.selectedChat ? state.conversationStore[state.selectedChat] : undefined
      if (currentMessages && currentMessages.length === 0) return state

      return {
        ...state,
        conversations: [
          {
            id: action.payload.id,
            title: action.payload.title,
            created_at: action.payload.created_at,
          },
          ...state.conversations,
        ],
        conversationStore: {
          ...state.conversationStore,
          [action.payload.id]: [],
        },
        selectedChat: action.payload.id,
      }
    case 'SELECT_CHAT': {
      const chatExists = state.conversations.some((chat) => chat.id === action.payload)
      if (!chatExists) return state
      return {
        ...state,
        selectedChat: action.payload,
      }
    }

    case 'DELETE_CHAT': {
      const newStore = { ...state.conversationStore }
      delete newStore[action.payload]
      return {
        ...state,
        conversations: state.conversations.filter((conversation) => conversation.id !== action.payload),
        conversationStore: newStore,
        selectedChat: state.selectedChat === action.payload ? null : state.selectedChat,
      }
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
    case 'REMOVE_LAST_MESSAGE': {
      const currentConversation = state.conversationStore[action.payload.id] ?? []
      if (currentConversation.length === 0) return state

      return {
        ...state,
        conversationStore: {
          ...state.conversationStore,
          [action.payload.id]: currentConversation.slice(0, -1),
        },
      }
    }
    case 'ADD_ASSISTANT_MESSAGE':
      return {
        ...state,
        conversationStore: {
          ...state.conversationStore,
          [action.payload.id]: [
            ...(state.conversationStore[action.payload.id] ?? []),
            { role: 'assistant', content: '' }
          ],
        },
      }
    case 'SET_LAST_ERROR_MESSAGE': {
      const conversation = state.conversationStore[action.payload.id] ?? []

      if (conversation.length === 0) return state

      const lastConversation = conversation[conversation.length - 1]

      if (lastConversation.role !== 'assistant') return state
      return {
        ...state,
        conversationStore: {
          ...state.conversationStore,
          [action.payload.id]: [
            ...conversation.slice(0, -1),
            { ...lastConversation, content: action.payload.error },
          ],
        },
      }
    }
    case 'STREAM_MESSAGE': {
      const convo = state.conversationStore[action.payload.id] ?? []
      const last = convo[convo.length - 1]
      if (!last || last.role !== 'assistant') return state
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

    case 'LOAD_CONVERSATIONS': {
      return {
        ...state,
        conversations: action.payload
      }
    }
    case 'LOAD_MESSAGES': {
      return {
        ...state,
        conversationStore: {
          ...state.conversationStore,
          [action.payload.id]: action.payload.messages
        },
      }
    }
    case 'DESELECT_CHAT':
      return { ...state, selectedChat: null }
    case 'SET_LOADING_CONVERSATIONS':
      return { ...state, isLoadingConversations: action.payload }
    case 'SET_LOADING_MESSAGES':
      return { ...state, isLoadingMessages: action.payload }
    default:
      return state
  }
}
