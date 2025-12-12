import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { OpenAIImageResponse, OpenAIImageRequest, UserImageRequest } from '@/types/openai'
import { saveImages } from '@/lib/supabase/saveImages'

const apiKey = process.env.OPENAI_IMAGE_API_KEY

interface OpenAiErrorMessage {
    message: string
    type: string
    code: string
}

export async function POST(request: Request) {
    //We need Clerk to verify that user is authorized and is logged in
    const { userId } = await auth()
    if (!userId) {
        return NextResponse.json(
            { error: 'Not authorized' },
            { status: 401 }
        )
    }

    const newUser = await currentUser()
    const email = newUser?.emailAddresses?.[0]?.emailAddress

    if (!email) {
        return NextResponse.json(
            { error: 'User email not found. Cannot synchronize user record.' },
            { status: 400 }
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
        model: userRequest.model ?? 'DALL-E-3',
        prompt: userRequest.prompt as string,
        n: userRequest.n ?? 1,
        size: userRequest.size ?? '1024x1024',
        response_format: userRequest.response_format ?? 'url'
    }


    if (!apiKey) {
        return NextResponse.json(
            { error: 'Server error check api key' },
            { status: 500 }
        )
    }

    try {
        const openAiData = await fetchOpenAi(userId, email, userOptions)

        return NextResponse.json(openAiData)
    } catch (err: unknown) {
        console.error('Image generation failed', err)

        const errorMessage = err as OpenAiErrorMessage
        /*Cast Open ai error message for innapropiate content based of the open ai object
        return
        OpenAi API error {
          error: {
            message: 'Your request was rejected as a result of our safety system. ',
            type: 'image_generation_user_error',
            param: null,
            message: 'Your request was rejected as a result of our safety system. ',
            type: 'image_generation_user_error',
            param: null,
            type: 'image_generation_user_error',
            param: null,
            param: null,
            code: 'content_policy_violation'
          }
        */

        if (errorMessage.message?.includes('safety system') ||
            errorMessage.type === 'image_generation_user_error' ||
            errorMessage.code === 'content_policy_violation') {
            return NextResponse.json(
                {
                    error: 'Your prompt violates content policy. Please try a different prompt.'
                },
                { status: 400 }
            )
        }
    }

    return NextResponse.json(
        { error: 'Failed to generate image. Please try again.' },
        { status: 500 }
    )
}

//This function needs to validate that a user enters a prompt
function validateUserRequest(userRequest: UserImageRequest): string | null {
    if (!userRequest.prompt || userRequest.prompt.trim() === '') {
        return 'A prompt is required'
    }
    return null
}

//This function will fetch and call open ai endpoint
async function fetchOpenAi(userId: string, userEmail: string, options: OpenAIImageRequest): Promise<OpenAIImageResponse> {
    const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(options)
    })
    //If Open ai rejects the prompt 
    if (!imageResponse.ok) {
        const errorData = await imageResponse.json()
        console.error('OpenAi API error', errorData)
        throw {
            message: errorData?.error?.message || 'OpenAI request failed',
            type: errorData?.error?.type || imageResponse.statusText || 'openai_error',
        }
    }

    const imageData: OpenAIImageResponse = await imageResponse.json()

    const savedImages = await Promise.all(
        imageData.data.map(async (image) => {
            if (!image.url) {
                throw new Error('No URL in the api response')
            }
            return await saveImages({
                userId,
                userEmail,
                prompt: options.prompt,
                imageUrl: image.url,
                model: options.model,
                size: options.size!,
                creditsUsed: 1
            })
        })
    )
    return {
        data: savedImages.map(savedImg => ({ url: savedImg.url }))
    }
}