import { type UserCredits } from '@/types/supabaseTypes'
import { supabase } from '../supabase/supabaseClient'

const dailyGorillaCoins = 10

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

export async function refreshUserCredits(userId: string) {
    const todayMidnightUTC = new Date()
    todayMidnightUTC.setUTCHours(0, 0, 0, 0)

    const { creditsRemaining, creditsReset } = await getUserCredits(userId)

    if (creditsReset < todayMidnightUTC) {
        // 4. Reset credits to daily allowance
        const { data, error } = await supabase
            .from('users')
            .update({
                credits_remaining: dailyGorillaCoins,
                credits_reset_at: todayMidnightUTC
            })
            .eq('id', userId)
            .select('credits_remaining, credits_reset_at')
            .single()

        if (error || !data) {
            throw new Error('Failed to reset user credits')
        }

        return {
            creditsRemaining: data.credits_remaining,
            creditsReset: new Date(data.credits_reset_at),
            didReset: true
        }
    }
    return {
        creditsRemaining,
        creditsReset,
        didReset: false
    }
}

//UpdateUserCredits Function goes here

/*export async function canAffordtoGenerateImage(userId: string, modelId: ImageModelId, num: number) {
    //const { credits } = await updatedUserCredits()
    //const costToGenerate = getRequiredCredits(modelId, num) // This from the types
}

/*export async function deductCredits(userId: string, amount: number) {

} */