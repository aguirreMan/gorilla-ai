import { supabaseServer } from '@/lib/supabase/supabaseServer'

export async function saveChatHistory(conversationId: string, userID: string, title: string) {
  const { data, error } = await supabaseServer
    .from('conversations')
    .upsert({
      id: conversationId,
      user_id: userID,
      title,
      updated_at: new Date(),
    },
    {
      onConflict: 'id',
    })
    .select()
    .single()

  if (error || !data) {
    console.error('Failed to save conversation', error)
    throw new Error('Could not save conversation')
  }

  return data
}

export async function saveChatMessage(conversationId: string, role: 'user' | 'assistant', content: string) {
  const { data, error } = await supabaseServer
    .from('messages')
    .insert({
      conversation_id: conversationId,
      role,
      content,
      created_at: new Date(),
    },
    )
    .select()
    .single()

  if (error || !data) {
    console.error('Failed to save message', error)
    throw new Error('Could not save message')
  }

  return data
}
