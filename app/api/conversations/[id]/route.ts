import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { supabaseServer } from '@/lib/supabase/supabaseServer'

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  // Simulate a delay to test delete
  //await new Promise(resolve => setTimeout(resolve, 2000))

  const { error } = await supabaseServer
    .from('conversations')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)

  if (error) {
    console.error('Delete error:', error.message)

    return NextResponse.json(
      { error: 'Failed to delete messages' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
