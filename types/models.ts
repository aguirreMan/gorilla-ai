interface ModelsConfig {
    displayName: string
    sizes: string[]
}

interface PricingConfig {
    creditsUsed: number
}

interface FullModelConfig {
    uiData: ModelsConfig
    billingData: PricingConfig
}

export const ModelsUsed = {
    'dall-e-2': {
        uiData: {
            displayName: 'DALL-E 2',
            sizes: ['1024x1024', '256x256', '512x512']
        },
        billingData: {
            creditsUsed: 1
        }
    },
    'dall-e-3': {
        uiData: {
            displayName: 'DALL-E 3',
            sizes: ['1024x1024', '1792x1024', '1024x1792']
        },
        billingData: {
            creditsUsed: 2
        }
    }
} as const satisfies Record<string, FullModelConfig>


export type ImageModel = keyof typeof ModelsUsed
