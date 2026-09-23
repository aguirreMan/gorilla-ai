import { useQueryClient } from '@tanstack/react-query'

export function useSyncMessages() {
    const query = useQueryClient()

    async function syncMessages(chatId: string) {
        await query.invalidateQueries({ queryKey: ['messages', chatId] })
    }
    return { syncMessages }
}