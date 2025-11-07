import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { OpenAIImageResponse, OpenAIImageRequest, UserImageRequest } from '@/app/types/openai'


const apiKey = process.env.OPENAI_IMAGE_API_KEY

export async function POST(request: Request) {
    const { userId } = await auth()
    if (!userId) {
        return NextResponse.json(
            { error: 'Not authorized' },
            { status: 401 }
        )
    }

    const userRequest: UserImageRequest = await request.json()

    const userOptions: OpenAIImageRequest = {
        model: userRequest.model ?? 'dall-e-3',
        prompt: userRequest.prompt as string,
        n: userRequest.n ?? 1,
        size: userRequest.size ?? '512x512',
        response_format: userRequest.response_format ?? 'url'
    }



    if (!apiKey) {
        return NextResponse.json(
            { error: 'Server error check api key' },
            { status: 500 }
        )
    }
    fetchOpenAi(userOptions)
    return NextResponse.json(prompt)
}


async function fetchOpenAi(options: OpenAIImageRequest): Promise<OpenAIImageResponse> {
    const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(options)
    })
    const imageData: OpenAIImageResponse = await imageResponse.json()
    return imageData
}