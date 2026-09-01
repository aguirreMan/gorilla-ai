import { Chatstate, Conversation } from '@/types/chatTypes'

export type ChatActions =
  | { type: 'CREATE_NEW_CHAT'; payload: Conversation }
  | { type: 'DELETE_CHAT'; payload: string }
  | { type: 'ADD_USER_MESSAGE'; payload: { id: string; message: string } }
  | { type: 'ADD_ASSISTANT_MESSAGE'; payload: { id: string } }
  | { type: 'APPEND_STREAM_CONTENT'; payload: { id: string; content: string } }
  | { type: 'REMOVE_EMPTY_ASSISTANT_MESSAGE'; payload: { id: string } }



export function chatReducer(state: Chatstate, action: ChatActions): Chatstate {
  switch (action.type) {
    case 'CREATE_NEW_CHAT': {
      // const selectedConversationMessage = state.selectedChat ? state.conversationStore[state.selectedChat] : undefined
      //if (selectedConversationMessage && selectedConversationMessage.length === 0) return state

      return {
        ...state,
        /*conversations: [
          {
            id: action.payload.id,
            title: action.payload.title,
            created_at: action.payload.created_at,
          },
          //...state.conversations,
        ],
        */
        conversationStore: {
          ...state.conversationStore,
          [action.payload.id]: [],
        },
        //selectedChat: action.payload.id,
      }
    }

    case 'DELETE_CHAT': {
      const newStore = { ...state.conversationStore }
      delete newStore[action.payload]
      return {
        ...state,
        //conversations: state.conversations.filter((conversation) => conversation.id !== action.payload),
        conversationStore: newStore,
        // selectedChat: state.selectedChat === action.payload ? null : state.selectedChat,
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
    default:
      return state
  }
}
