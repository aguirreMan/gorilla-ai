'use client'
import { useUser } from '@clerk/nextjs'
import { useState } from 'react'
import Dashboardnav from '@/components/dashboard-components/Dashboardnav'
import UniversalChat from '@/components/dashboard-components/UniversalChat'
import UniversalSidebar from '@/components/dashboard-components/UniversalSidebar'
import MessageBox from '@/components/dashboard-components/MessageBox'
import { Message, ConversationStore, StreamingResponse, Conversation } from '@/types/chatTypes'


function generateId() {
  return Math.random().toString(36).substring(2, 10)
}

function generateTitle(message: string) {
  return message.length > 40 ? message.substring(0, 40) + '...' : message
}

export default function DashboardPage() {
  const { isSignedIn, isLoaded } = useUser()
  const [isLoading, setIsLoading] = useState(false)

  const [conversations, setConversations] = useState<Conversation[]>([])
  const [conversationStore, setConversationStore] = useState<ConversationStore>({})
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)

  const activeMessages = activeConversationId
    ? conversationStore[activeConversationId] ?? []
    : []

  function handleNewChat() {
    const id = generateId()
    const newConvo: Conversation = {
      id,
      title: 'New Chat',
      created_at: new Date(),
    }
    setConversations((prev) => [newConvo, ...prev])
    setConversationStore((prev) => ({ ...prev, [id]: [] }))
    setActiveConversationId(id)
  }

  function handleSelectConversation(id: string) {
    setActiveConversationId(id)
  }

  function handleDeleteConversation(id: string) {
    setConversations((prev) => prev.filter((c) => c.id !== id))
    setConversationStore((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
    if (activeConversationId === id) setActiveConversationId(null)
  }

  async function submitToOpenRouter(message: string) {
    let convoId = activeConversationId

    if (!convoId) {
      convoId = generateId()
      const newConvo: Conversation = {
        id: convoId,
        title: generateTitle(message),
        created_at: new Date(),
      }
      setConversations((prev) => [newConvo, ...prev])
      setConversationStore((prev) => ({ ...prev, [convoId!]: [] }))
      setActiveConversationId(convoId)
    }

    const currentMessages = conversationStore[convoId] ?? []
    const userMessage: Message = { role: 'user', content: message }
    const updatedMessages = [...currentMessages, userMessage]

    setConversationStore((prev) => ({ ...prev, [convoId!]: updatedMessages }))
    setIsLoading(true)

    try {
      const response = await fetch('/api/openrouter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'openrouter/auto',
          messages: updatedMessages,
        }),
      })

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      const assistantMessage: Message = {
        role: 'assistant',
        content: '',
      }

      setConversationStore((prev) => ({
        ...prev,
        [convoId!]: [...updatedMessages, assistantMessage],
      }))

      let done = false

      while (!done) {
        const result = await reader?.read()
        done = result?.done ?? true

        const chunk = decoder.decode(result?.value || new Uint8Array())

        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data:')) {
            const json = line.replace('data: ', '').trim()

            if (json === '[DONE]') return

            try {
              const parsed: StreamingResponse = JSON.parse(json)
              const content = parsed.choices?.[0]?.delta?.content

              if (content) {
                setConversationStore((prev) => {
                  const convo = prev[convoId!] ?? []
                  const last = convo[convo.length - 1]

                  if (!last) return prev

                  return {
                    ...prev,
                    [convoId!]: [
                      ...convo.slice(0, -1),
                      { ...last, content: last.content + content },
                    ],
                  }
                })
              }
            } catch {}
          }
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isLoaded) return <div>Loading...</div>
  if (!isSignedIn) return null

  return (
    <div className="flex h-screen overflow-hidden">
      <UniversalSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewChat={handleNewChat}
        onDeleteConversation={handleDeleteConversation}
      />

      {/* Main area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Dashboardnav />
        <div className="flex flex-col flex-1 overflow-hidden pt-16">
          <MessageBox messages={activeMessages} isLoading={isLoading} />
          <div
            className="px-4 py-3 border-t"
            style={{ borderColor: 'var(--border)' }}
          >
            <UniversalChat onSend={submitToOpenRouter} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  )
}
