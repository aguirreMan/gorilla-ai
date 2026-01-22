import { auth } from '@clerk/nextjs/server'
import { supabaseServer } from '@/lib/supabase/supabaseServer'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const { userId } = await auth()
    if (!userId) {
        return NextResponse.json(
            { error: 'unauthorized user' },
            { status: 401 }
        )
    }

    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page') ?? '0')
    const limitOfImages = 6

    const from = page * limitOfImages
    const to = from + limitOfImages - 1

    const { data, error, count } = await supabaseServer
        .from('generations')
        .select('*', { count: 'exact' })
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(from, to)

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
    return NextResponse.json(
        { data, hasMore: (count ?? 0) > to + 1 }
    )
}