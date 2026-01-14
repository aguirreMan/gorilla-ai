import { UserCredits } from '@/types/supabaseTypes'
import { supabase } from '../supabase/supabaseClient'

export default async function getUserCredits(userId: string): Promise<UserCredits> {
    const { data, error } = await supabase
        .from('users')
        .select('credits_remaining, credits_reset_at')
        .eq('id', userId)
        .single()

    if (error || !data) {
        throw new Error('Failed to fetch user data')
    }
    return {
        creditsRemaining: data.credits_remaining,
        creditsReset: new Date(data.credits_reset_at)
    }
}   