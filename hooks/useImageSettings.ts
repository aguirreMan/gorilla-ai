import { useState } from 'react'
import { ImageModel, ModelsUsed } from '@/types/models'

export default function useImageSettings() {
    const [model, setModel] = useState<ImageModel>('dall-e-3')
    const [imageSize, setImageSize] = useState<string>('512x512')
    const [numberOfImages, setNumberOfImages] = useState<number>(1)

    function chooseModel(newModel: ImageModel) {
        const newConfig = ModelsUsed[newModel].uiData
        setModel(newModel)
        setImageSize(newConfig.sizes[0])
        setNumberOfImages(newConfig.imageCount[0])
    }

    function chooseImageSize(newSize: string) {
        setImageSize(newSize)
    }

    function updateNumberofImagesGenerated(newNumber: number) {
        setNumberOfImages(newNumber)
    }

    const currentModelConfig = ModelsUsed[model]

    return {
        model,
        imageSize,
        numberOfImages,
        chooseModel,
        chooseImageSize,
        updateNumberofImagesGenerated,
        availableModels: Object.keys(ModelsUsed) as ImageModel[],
        availableSizes: currentModelConfig.uiData.sizes,  // Dynamically gives sizes for current model
        availableImageCounts: currentModelConfig.uiData.imageCount
    }
}