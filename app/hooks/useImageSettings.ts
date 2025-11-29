import { useState } from 'react'

type ImageModel = 'dalle-2' | 'dalle-3'

type ModelSizeOptions = Record<ImageModel, string[]>

type NumberOfImagesGenerated = Record<ImageModel, number[]>

const modelSizes: ModelSizeOptions = {
    'dalle-2': ['1024x1024', '256x256', '512x512'],
    'dalle-3': ['1024x1024', '1792x1024', '1024x1792']
}

const numberOfImagestoGenerate: NumberOfImagesGenerated = {
    'dalle-2': [1, 2],
    'dalle-3': [1]
}

export default function useImageSettings() {
    const [model, setModel] = useState<ImageModel>('dalle-2')
    const [imageSize, setImageSize] = useState<string>('1024x1024')
    const [numberOfImages, setNumberOfImages] = useState<number>(1)

    function chooseModel(newModel: ImageModel) {
        setModel(newModel)
        setImageSize(modelSizes[newModel][0])
        setNumberOfImages(numberOfImagestoGenerate[newModel][0])
    }
    function chooseImageSize(newSize: string) {
        setImageSize(newSize)
    }

    function updateNumberofImagesGenerated(newNumber: number) {
        setNumberOfImages(newNumber)
    }
    return {
        model,
        imageSize,
        numberOfImages,
        chooseModel,
        chooseImageSize,
        updateNumberofImagesGenerated,
        availableModels: ['dalle-2', 'dalle-3'] as ImageModel[],
        availableSizes: modelSizes[model],  // Dynamically gives sizes for current model
        availableImageCounts: numberOfImagestoGenerate[model]
    }
}