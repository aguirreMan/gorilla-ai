'use client'

import { useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useChat } from '@/hooks/chat/useChat'
import { createConversation } from '@/lib/chat/createConversation'
import MessageBox from './MessageBox'
import UniversalChat from './UniversalChat'

export default function ChatArea() {
    const { chatId } = useParams<{ chatId?: string }>()
    const activeChatId = chatId ?? null

    const chat = useChat(activeChatId)
    const router = useRouter()
    const queryClient = useQueryClient()

    const creatingChatRef = useRef(false)

    async function handleSend(message: string) {
        if (creatingChatRef.current) return

        if (activeChatId) {
            await chat.sendMessage(message, activeChatId)
            return
        }

        creatingChatRef.current = true

        try {
            const conversation = await createConversation()

            router.replace(`/dashboard/${conversation.id}`)

            void queryClient.invalidateQueries({
                queryKey: ['conversations'],
            })

            await chat.sendMessage(message, conversation.id)
        } catch {
            toast.error('Could not send message.')
        } finally {
            creatingChatRef.current = false
        }
    }

    return (
        <div className="flex flex-col flex-1 min-h-0">
            <MessageBox
                messages={chat.messages}
                isStreaming={chat.isStreaming}
                isLoadingMessages={chat.isLoading}
            />

            <div className="shrink-0 px-4 py-3 border-t bg-background">
                <UniversalChat
                    onSend={handleSend}
                    isStreaming={chat.isStreaming}
                    stopStreaming={chat.stopStreaming}
                />
            </div>
        </div>
    )
}