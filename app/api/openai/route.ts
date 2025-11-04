import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { RequestImage } from '@/app/types/openai'


export async function POST(request: Request) {
    const { userId } = await auth()
    if (!userId) {
        return NextResponse.json(
            { error: 'Not authorized' },
            { status: 401 }
        )
    }

    const body: RequestImage = await request.json()
    const { prompt } = body

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey || apiKey === 'fakeKeyforNow') {
        return NextResponse.json({
            data: [
                { url: 'https://via.placeholder.com/1024x1024?text=Mock+Image' }
            ]
        })
        //fetchOpenAI() this would be the real key eventually
    }
    return NextResponse.json(prompt)
}