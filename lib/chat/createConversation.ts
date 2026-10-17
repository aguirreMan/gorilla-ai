// lib/chat/createConversation.ts
import type { Conversation } from '@/types/chatTypes'

export async function createConversation(): Promise<Conversation> {
    const response = await fetch('/api/conversations', {
        method: 'POST',
    })

    if (!response.ok) {
        throw new Error('Failed to create conversation')
    }

    const { conversation }: { conversation: Conversation } =
        await response.json()

    return conversation
}