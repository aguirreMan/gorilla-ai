import { supabaseServer } from './supabaseServer'

export async function ensureUserExists(userId: string, userEmail: string) {
    const userObject = {
        id: userId,
        email: userEmail
    }

    const { error: upsertError } = await supabaseServer
        .from('users')
        .upsert(
            userObject,
            {
                onConflict: 'id',
                ignoreDuplicates: true
            }
        )
        .select('id')
        .maybeSingle()

    if (upsertError) {
        console.error('CRITICAL: Failed to upsert user record into "users" table.', upsertError)
        throw new Error('Database synchronization failed: Could not create user record.')
    }
}