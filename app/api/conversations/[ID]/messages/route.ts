import { auth } from '@clerk/nextjs/server'
import { NextResponse, NextRequest } from 'next/server'
import { supabaseServer } from '@/lib/supabase/supabaseServer'

interface Message {
  role: string
  content: string
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  const { data: messages, error } = await supabaseServer
      .from('messages')
      .select(`
        role,
        content,
        conversations!inner(user_id)
      `)
      .eq('conversation_id', id)
      .eq('conversations.user_id', userId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Fetch error:', error.message)

      return NextResponse.json(
        { error: 'Failed to fetch messages' },
        { status: 500 }
      )
    }

    const cleanedMessages: Message[] = (messages ?? []).map(
      ({ role, content }) => ({
        role,
        content
      })
    )

  return NextResponse.json({ messages: cleanedMessages })
}
