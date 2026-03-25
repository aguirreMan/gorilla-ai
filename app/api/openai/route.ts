import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { OpenAIImageResponse, OpenAIImageRequest, UserImageRequest, OpenAiErrorMessage } from '@/types/openai'
import { saveImages } from '@/lib/supabase/saveImages'
import { imageGenerationRateLimiting } from '@/lib/upstash/rateLimit'
import { ImageModel, ModelsUsed } from '@/types/models'
import { deductCredits, refreshUserCredits } from '@/lib/pricing/credits'
import { pricingCreditsUsed } from '@/lib/pricing/pricing'

const apiKey = process.env.OPENAI_IMAGE_API_KEY

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
    //ADd Upstash Rate limiting here
    const {
        success,
        limit,
        remaining,
        reset } = await imageGenerationRateLimiting.limit(`user:${userId}`)

    const rateLimitHeaders = {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
    }

    if (!success) {
        return NextResponse.json(
            { error: 'Too many Image Generations slow down please' },
            {
                status: 429,
                headers: rateLimitHeaders
            }
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
        size: userRequest.size ?? '1024x1024',
        response_format: userRequest.response_format ?? 'url'
    }

    const { creditsRemaining } = await refreshUserCredits(userId)

    const modelId: ImageModel = userOptions.model


    const costOfImage = pricingCreditsUsed(modelId)

    if (creditsRemaining < costOfImage) {
        return NextResponse.json(
            {
                error: 'Insufficient Gorilla Coins',
                required: costOfImage,
                available: creditsRemaining,
                message: 'You need more coins, Upgrade to a paid plan for more'
            },
            {
                status: 402,
                headers: rateLimitHeaders
            }
        )
    }

    if (!apiKey) {
        return NextResponse.json(
            { error: 'Server error check api key' },
            { status: 500 }
        )
    }

    try {
        const openAiData = await fetchOpenAi(userId, email, userOptions)

        await deductCredits(userId, costOfImage)

        return NextResponse.json(openAiData, {
            status: 200,
            headers: rateLimitHeaders
        })
    } catch (err: unknown) {
        console.error('Image generation failed', err)

        const errorMessage = err as OpenAiErrorMessage

        if (errorMessage.message?.includes('safety system') ||
            errorMessage.type === 'image_generation_user_error' ||
            errorMessage.code === 'content_policy_violation') {
            return NextResponse.json(
                {
                    error: 'Your prompt violates content policy. Please try a different prompt.'
                },
                {
                    status: 400,
                    headers: rateLimitHeaders
                }
            )
        }
    }

    return NextResponse.json(
        { error: 'Failed to generate image. Please try again.' },
        {
            status: 500,
            headers: rateLimitHeaders
        }
    )
}

function validateUserRequest(userRequest: UserImageRequest): string | null {
    if (!userRequest.prompt || userRequest.prompt.trim() === '') {
        return 'A prompt is required'
    }
    return null
}

//Fetch open ai endpoint
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
            const modelId: ImageModel = options.model

            const saved = await saveImages({
                userId,
                userEmail,
                prompt: options.prompt,
                imageUrl: image.url,
                model: options.model,
                size: options.size!,
                creditsUsed: ModelsUsed[modelId].billingData.creditsUsed
            })
            return saved
        })

    )
    return {
        data: savedImages.map(savedImg => ({ url: savedImg.url }))
    }
}
