interface ModelsConfig {
    displayName: string
    sizes: string[]
    imageCount: number[]
}

export const ModelsUsed: Record<string, ModelsConfig> = {
    'dall-e-2': {
        displayName: 'DALL-E-2',
        sizes: ['1024x1024', '256x256', '512x512'],
        imageCount: [1, 2]
    },
    'dall-e-3': {
        displayName: 'DALL-E-3',
        sizes: ['1024x1024', '1792x1024', '1024x1792'],
        imageCount: [1]
    }
}

export type ImageModel = keyof typeof ModelsUsed