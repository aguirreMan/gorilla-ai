import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { refreshUserCredits } from '@/lib/pricing/credits'

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'cannot get user id' }, { status: 401 })
    }

    const getCurrentUserCredits = await refreshUserCredits(userId)
    const getNumberFromCurrentUserCredits = getCurrentUserCredits.creditsRemaining
    return NextResponse.json({  creditsRemaining: getNumberFromCurrentUserCredits })
  } catch (error) {
    console.error('Credits API Error', error)
    return NextResponse.json({error: 'Credit system error'}, {status: 500})
  }
}
