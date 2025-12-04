//These are the types for open ai models

export type OpenAIImageRequest = {
    model: string
    size?: string
    n: number
    prompt: string
    response_format?: 'url' | 'b64_json' // Optional, defaults to 'url' if not specified
}

//This is the data that open ai gives back
// Based on response_format, either url OR b64_json will be present
export type OpenAIImageResponse = {
    data: Array<{
        url?: string
        b64_json?: string
    }>
}

export type GeneratedImageResult = {
    url?: string;
    b64_json?: string;
}

export type OpenAIImageUrls = {
    data: GeneratedImageResult[];
};

//This is what the user sends to open ai just a prompt of an image they want
export type RequestImage = {
    prompt: string
}

export type UserImageRequest = Partial<Omit<OpenAIImageRequest, 'prompt'>> & {
    prompt: string
}