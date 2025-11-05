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
                { url: 'https://media.istockphoto.com/id/484915982/photo/akihabara-tokyo.jpg?s=612x612&w=0&k=20&c=kbCRYJS5vZuF4jLB3y4-apNebcCEkWnDbKPpxXdf9Cg=' }
            ]
        })
        //fetchOpenAI() this would be the real key eventually
    }
    return NextResponse.json(prompt)
}