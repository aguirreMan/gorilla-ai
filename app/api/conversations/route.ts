import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/supabaseServer'

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: conversations, error } = await supabaseServer
    .from('conversations')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch conversations', error)
    return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 })
  }

  return NextResponse.json({ conversations })
}
