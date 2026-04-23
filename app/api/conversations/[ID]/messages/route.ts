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
  console.log('chatId:', id)
  console.log('userId from Clerk:', userId)

  const { data: conversation, error: conversationError } = await supabaseServer
    .from('conversations')
    .select('id')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (conversationError || !conversation) {
    return NextResponse.json({ error: 'Conversation not found' }, { status: 404 })
  }

  const { data: messages, error } = await supabaseServer
    .from('messages')
    .select('role, content')
    .eq('conversation_id', id)
    .eq('conversations.user_id', userId)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Fetch error:', error.message)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }

  if (!messages || messages.length === 0) {
    return NextResponse.json({ messages: [] })
  }

  // Clean up the response so we don't send the user_id back in every message
  const cleanedMessages: Message[] = messages.map((message: Message) => ({
      role: message.role,
      content: message.content
    })
  )
  return NextResponse.json({ messages: cleanedMessages })
}
