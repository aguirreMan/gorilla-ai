'use client'
import { useUser } from '@clerk/nextjs'
import { useState } from 'react'
import Dashboardnav from '@/components/dashboard-components/Dashboardnav'
import UniversalChat from '@/components/dashboard-components/UniversalChat'
import UniversalSidebar, { Conversation } from '@/components/dashboard-components/UniversalSidebar'
import MessageBox, { Message } from '@/components/dashboard-components/MessageBox'

// Local state shape — swap for Supabase later
interface ConversationStore {
  [id: string]: Message[]
}

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
    // Auto-create a conversation if none is active
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

    // Update title on first message
    setConversations((prev) =>
      prev.map((c) =>
        c.id === convoId && c.title === 'New Chat'
          ? { ...c, title: generateTitle(message) }
          : c
      )
    )

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
      const data = await response.json()
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content,
      }
      setConversationStore((prev) => ({
        ...prev,
        [convoId!]: [...updatedMessages, assistantMessage],
      }))
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
