import { Message } from '@/types/chatTypes'

export type ChatActions =
  | { type: 'ADD_USER_MESSAGE'; payload: { message: string } }
  | { type: 'ADD_ASSISTANT_MESSAGE' }
  | { type: 'APPEND_STREAM_CONTENT'; payload: { content: string } }
  | { type: 'REMOVE_EMPTY_ASSISTANT_MESSAGE' }
  | { type: 'RESET' }

export function chatReducer(messages: Message[], action: ChatActions): Message[] {
  switch (action.type) {
    /*Client state */
    case 'ADD_USER_MESSAGE': {
      return [
        ...messages,
        {
          role: 'user',
          content: action.payload.message,
        },
      ]
    }
    case 'ADD_ASSISTANT_MESSAGE': {
      return [
        ...messages,
        {
          role: 'assistant',
          content: ''
        }
      ]
    }

    case 'APPEND_STREAM_CONTENT': {
      return messages.map((message, index) => {
        const isLastMessage = index === messages.length - 1

        if (isLastMessage && message.role === 'assistant') {
          return {
            ...message,
            content: message.content + action.payload.content,
          }
        }
        return message
      })
    }

    case 'REMOVE_EMPTY_ASSISTANT_MESSAGE': {
      if (messages.length === 0) return messages
      const lastMessage = messages[messages.length - 1]

      if (lastMessage.role === 'assistant' && lastMessage.content === '') {
        return messages.slice(0, -1)
      }
      return messages
    }
    case 'RESET': {
      return []
    }
    default: {
      return messages
    }
  }
}
