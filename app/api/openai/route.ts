import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { OpenAIImageResponse, OpenAIImageRequest, UserImageRequest } from '@/app/types/openai'

const apiKey = process.env.OPENAI_IMAGE_API_KEY

export async function POST(request: Request) {
    //We need Clerk to verify that user is legit and is logged in
    const { userId } = await auth()
    if (!userId) {
        return NextResponse.json(
            { error: 'Not authorized' },
            { status: 401 }
        )
    }

    const userRequest: UserImageRequest = await request.json()

    const validationError = validateUserRequest(userRequest)
    if (validationError) {
        return NextResponse.json(
            { error: validationError },
            { status: 400 }
        )
    }

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

    try {
        const openAiData = await fetchOpenAi(userOptions)
        return NextResponse.json(openAiData)
    } catch (error: unknown) {
        console.error('Image generation failed', error)
        return NextResponse.json(
            { error: 'Failed to generate image' },
            { status: 500 }
        )
    }

}
//This function needs to validate that a user enters a prompt
function validateUserRequest(userRequest: UserImageRequest): string | null {
    if (!userRequest.prompt || userRequest.prompt.trim() === '') {
        return 'A prompt is required'
    }
    return null
}

//This function will fetch and call open ai endpoint
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