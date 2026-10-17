import { useQueryClient } from '@tanstack/react-query'

export function useSyncMessages() {
    const query = useQueryClient()

    async function syncMessages(chatId: string | null) {
        if (!chatId) return
        await query.invalidateQueries({ queryKey: ['messages', chatId] })
    }
    return { syncMessages }
}