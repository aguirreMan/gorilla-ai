type OpenAIImageRequest = {
    model: 'gpt-image-1'
    size?: '1024x1024' | '256x256' | '512x512'
    n: 1
    prompt: string
}

//This is the data that open ai gives back
type OpenAIImageResponse = {
    data: Array<{
        url?: string
        b64_json?: string
    }>
}


export type RequestImage = {
    prompt: string
}

type returnedImageObject = {
    responseFormat: 'url' | 'b64_json'
    imageFormat: 'webp' | 'jpeg' | 'png'
}