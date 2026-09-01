import { useQuery } from '@tanstack/react-query'
import type { MessagesResponse } from '@/types/chatTypes'

export function useFetchMessages(chatId: string | null) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['messages', chatId],
        queryFn: async ({ signal }) => {
            const response = await fetch(`/api/conversations/${chatId}/messages`, { signal })

            if (!response.ok) {
                throw new Error('Failed to fetch messages for this chat')
            }
            const result: MessagesResponse = await response.json()
            return result.messages
        },
        enabled: !!chatId
    })
    return { messages: data ?? [], isLoading, error }
}