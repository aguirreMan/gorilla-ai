'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import type { Conversation } from '@/types/chatTypes'

export default function DashboardPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isCreating, setCreating] = useState(false)
  const creating = useRef(false)

  async function createConversation() {
    if (creating.current) return
    creating.current = true
    setCreating(true)
    try {
      const response = await fetch('/api/conversations', { method: 'POST' })
      if (!response.ok) throw new Error('Failed to create conversation')
      const { conversation }: { conversation: Conversation } = await response.json()
      await queryClient.invalidateQueries({ queryKey: ['conversations'] })
      router.push('/dashboard/' + conversation.id)
    } catch {
      toast.error('Could not create a chat. Please try again.')
    } finally {
      creating.current = false
      setCreating(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center flex-1 gap-4 p-6'>
      <h1>Welcome to Gorilla AI</h1>
      <Button onClick={createConversation} disabled={isCreating}>
        {isCreating ? 'Creating chat…' : 'Start a new chat'}
      </Button>
    </div>
  )
}
