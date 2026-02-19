import { useState } from 'react'
import { ImageModel, ModelsUsed } from '@/types/models'

export default function useImageSettings() {
    const [model, setModel] = useState<ImageModel>('dall-e-3')
    const [imageSize, setImageSize] = useState<string>('1024x1024')

  function chooseModel(newModel: ImageModel) {
    const newConfig = ModelsUsed[newModel].uiData
    setModel(newModel)
    setImageSize(newConfig.sizes[0])
  }

  function chooseImageSize(newSize: string) {
    setImageSize(newSize)
  }

  const currentModelConfig = ModelsUsed[model]

    return {
        model,
        imageSize,
        chooseModel,
        chooseImageSize,
        availableModels: Object.keys(ModelsUsed) as ImageModel[],
        availableSizes: currentModelConfig.uiData.sizes,
    }
}
