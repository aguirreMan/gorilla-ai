import { supabaseServer } from '@/lib/supabase/supabaseServer'

export async function saveChatHistory(conversationID: string, userID: string, title: string) {
  const { data, error } = await supabaseServer
    .from('conversations')
    .upsert({
      id: conversationID,
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

export async function saveChatMessage(conversationID: string, role: 'user' | 'assistant', content: string) {
  const { data, error } = await supabaseServer
    .from('messages')
    .insert({
      conversation_id: conversationID,
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
