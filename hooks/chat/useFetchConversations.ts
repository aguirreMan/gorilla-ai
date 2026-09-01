import { useQuery } from '@tanstack/react-query'
import type { ConversationsResponse } from '@/types/chatTypes'

export function useFetchConversations() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      const response = await fetch('/api/conversations')

      if (!response.ok) {
        throw new Error('Failed to fetch conversations')
      }
      const data: ConversationsResponse = await response.json()
      return data
    },
  })

  return { data, isLoading, error }
}
