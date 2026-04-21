import { supabaseServer } from '@/lib/supabase/supabaseServer'

export async function ensureUserExistsChat(userId: string, userEmail: string) {
  const { error } = await supabaseServer
    .from('users')
    .upsert(
      { id: userId, email: userEmail },
      { onConflict: 'id' }
    )

  if (error) {
    console.error('CRITICAL: Failed to upsert user record.', error)
    throw new Error('Database synchronization failed: Could not create user record.')
  }
}
