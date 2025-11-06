type OpenAIImageRequest = {
    model: 'gpt-image-1'
    size?: '1024x1024' | '256x256' | '512x512'
    n: 1
    prompt: string
    response_format?: 'url' | 'b64_json' // Optional, defaults to 'url' if not specified
}

//This is the data that open ai gives back
// Based on response_format, either url OR b64_json will be present
type OpenAIImageResponse = {
    data: Array<{
        url?: string
        b64_json?: string
    }>
}

//This is what the user sends to open ai just a prompt of an image they want
export type RequestImage = {
    prompt: string
}

// This is data that i want to track later for supabase
type ReturnedImageObject = {
    responseFormat: 'url' | 'b64_json'
    imageFormat: 'webp' | 'jpeg' | 'png'
}