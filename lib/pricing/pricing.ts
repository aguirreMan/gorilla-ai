import { ModelsUsed, type ImageModel } from '@/types/models'

export function pricingCreditsUsed(modelId: ImageModel): number {
  const model = ModelsUsed[modelId]
  return model.billingData.creditsUsed
}
