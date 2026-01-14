import { ModelsUsed, type ImageModel } from '@/types/models'

export function pricingCreditsUsed(modelId: ImageModel, num: number): number {
    const model = ModelsUsed[modelId]
    return model.billingData.creditsUsed * num
}