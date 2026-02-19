import { type UserCredits } from '@/types/supabaseTypes'
import { supabaseServer } from '../supabase/supabaseServer'

import { ImageModel } from '@/types/models'
import { pricingCreditsUsed } from './pricing'

const dailyGorillaCoins = 10

export async function getUserCredits(userId: string): Promise<UserCredits> {
    const { data, error } = await supabaseServer
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
        //Reset credits back to daily allowance
        const { data, error } = await supabaseServer
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

export async function deductCredits(userId: string, amount: number) {
    const { creditsRemaining } = await refreshUserCredits(userId)

    if (creditsRemaining < amount) {
        throw new Error('insufficeint funds')
    }
    const newCreditsRemaining = creditsRemaining - amount

    const { data, error } = await supabaseServer
        .from('users')
        .update({
            credits_remaining: newCreditsRemaining
        })
        .eq('id', userId)
        .select('credits_remaining, credits_reset_at')
        .single()

    if (error || !data) {
        throw new Error('Failed to deduct credits')
    }

    return {
        creditsRemaining: data.credits_remaining,
        creditsReset: new Date(data.credits_reset_at)
    }
}

export async function canAffordToGenerate(
    userId: string,
    modelId: ImageModel,
    num: number
): Promise<boolean> {
    const { creditsRemaining } = await refreshUserCredits(userId)
    const priceToGenerateImage = pricingCreditsUsed(modelId, num)
    return creditsRemaining >= priceToGenerateImage
}
