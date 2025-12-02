//Creating Context for passing my useImageSettings hook accessible to sidebar and 
//InputPrompt components

import { createContext, useContext, ReactNode } from 'react'
import useImageSettings from '@/app/hooks/useImageSettings'

type ImageSettingsContextType = ReturnType<typeof useImageSettings>
const ImagesContext = createContext<ImageSettingsContextType | undefined>(undefined)

export function ImageSettingsProvider({ children }: { children: ReactNode }) {
    const imageSettings = useImageSettings()

    return (
        <ImagesContext.Provider value={imageSettings}>
            {children}
        </ImagesContext.Provider>
    )
}

export function useImagesContext() {
    const context = useContext(ImagesContext)
    if (!context) throw new Error('useImagesContext must be used within ImageSettingsProvider')
    return context
}