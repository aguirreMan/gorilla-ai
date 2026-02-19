export type OpenAIImageRequest = {
    model: 'dall-e-2' | 'dall-e-3'
    size: string
    prompt: string
    response_format?: 'url' | 'b64_json'
}

export type OpenAIImageResponse = {
    data: Array<{
        url?: string
        b64_json?: string
    }>
}

export type UserImageRequest = Partial<Omit<OpenAIImageRequest, 'prompt'>> & {
    prompt: string
}

export interface OpenAiErrorMessage {
    message: string
    type: string
    code: string
}
