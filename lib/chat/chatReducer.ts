import { Chatstate, Conversation, Message } from '@/types/chatTypes'

export type ChatActions =
  // navigation state controls the selected conversation
  // Controls conversation navigation and selection.
  | { type: 'CREATE_NEW_CHAT'; payload: Conversation }
  | { type: 'SELECT_CHAT'; payload: string }
  | { type: 'DESELECT_CHAT' }
  | { type: 'DELETE_CHAT'; payload: string }

//Client state
// Optimistic chat updates and streaming.
  | { type: 'ADD_USER_MESSAGE'; payload: { id: string; message: string } }
  | { type: 'ADD_ASSISTANT_MESSAGE'; payload: { id: string } }
  | { type: 'APPEND_STREAM_CONTENT'; payload: { id: string; content: string } }
  | { type: 'REMOVE_EMPTY_ASSISTANT_MESSAGE'; payload: { id: string } }

  // server state
  // Hydrates conversations and messages from the server.
  | { type: 'LOAD_CONVERSATIONS'; payload: Conversation[] }
  | { type: 'LOAD_MESSAGES'; payload: { id: string; messages: Message[] } }

  // UI Loading States
  | { type: 'SET_LOADING_CONVERSATIONS'; payload: boolean }
  | { type: 'SET_LOADING_MESSAGES'; payload: boolean }

export function chatReducer(state: Chatstate, action: ChatActions): Chatstate {
  switch (action.type) {
    case 'CREATE_NEW_CHAT': {
      const selectedConversationMessage = state.selectedChat ? state.conversationStore[state.selectedChat] : undefined
      if (selectedConversationMessage && selectedConversationMessage.length === 0) return state

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
    }
    case 'SELECT_CHAT': {
      const chatExists = state.conversations.some((chat) => chat.id === action.payload)
      if (!chatExists) return state
      return {
        ...state,
        selectedChat: action.payload,
      }
    }
    case 'DESELECT_CHAT': {
      return {
        ...state,
        selectedChat: null,
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
      /*Client state */
    case 'ADD_USER_MESSAGE': {
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
    }
    case 'ADD_ASSISTANT_MESSAGE': {
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
    }

    case 'APPEND_STREAM_CONTENT': {
      const conversation = state.conversationStore[action.payload.id] ?? []
      const lastMessage = conversation[conversation.length - 1]
      if (!lastMessage || lastMessage.role !== 'assistant') return state
      return {
        ...state,
        conversationStore: {
          ...state.conversationStore,
          [action.payload.id]: [
            ...conversation.slice(0, -1),
            { ...lastMessage, content: lastMessage.content + action.payload.content },
          ],
        },
      }
    }

    case 'REMOVE_EMPTY_ASSISTANT_MESSAGE': {
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
    /* Server state */
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
      /* Ui Loading state */
    case 'SET_LOADING_CONVERSATIONS': {
      return {
        ...state,
        isLoadingConversations: action.payload,
      }
    }
    case 'SET_LOADING_MESSAGES': {
      return {
        ...state,
        isLoadingMessages: action.payload,
      }
    }
    default:
      return state
  }
}
