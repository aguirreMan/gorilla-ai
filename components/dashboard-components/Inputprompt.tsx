'use client'
import { ChangeEvent, useState } from 'react'
//import ImagesettingsSelect from './ImagesettingsSelect'
//import useImageSettings from '@/app/hooks/useImageSettings'
import { useImagesContext } from '@/context/ImageSettingsProvider'
import Image from 'next/image'
import { toast } from 'sonner'
import { GeneratedImageResult, OpenAIImageUrls } from '@/types/openai'
import { Sparkles } from 'lucide-react'

export default function Inputprompt() {
    const { model, imageSize, numberOfImages } = useImagesContext()
    const [userPrompt, setUserPrompt] = useState<string>('')
    const [isGenerating, setIsGenerating] = useState<boolean>(false)
    const [generatedUrl, setGeneratedUrl] = useState<string[]>([])

    //const { model, availableModels, chooseModel, chooseImageSize, imageSize, availableSizes } = useImageSettings()

    function allowUsertoInput(event: ChangeEvent<HTMLTextAreaElement>) {
        setUserPrompt(event.target.value)
    }
    const disableGenerateButton = userPrompt.trim() === '' || isGenerating


    async function submitToOpenAi() {
        if (disableGenerateButton) return
        setIsGenerating(true)

        try {
            const response = await fetch('/api/openai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: userPrompt,
                    model: model,
                    size: imageSize,
                    n: numberOfImages
                })
            })
            if (!response.ok) {
                const errorData = await response.json()
                console.log('Full error from API:', errorData)
                toast.error(response.status === 400
                    ? 'Content Policy Violation'
                    : 'Generation Failed', {
                    description: errorData.error
                })
                return
            }
            const openaiData: OpenAIImageUrls = await response.json()
            const urls = openaiData.data.map((img: GeneratedImageResult) => img.url).filter(Boolean) as string[]

            setGeneratedUrl(urls)
        } catch (error) {
            console.error('Error generating image:', error)
            toast.error('Please keep message appropiate and creative')
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <>
            <div className='flex justify-center items-center mt-0 px-4 w-full max-w-3xl mx-auto relative'>
                <textarea
                    onChange={allowUsertoInput}
                    value={userPrompt}
                    disabled={isGenerating}
                    className='w-full border rounded-3xl text-white pt-4 pl-4
                    text-lg focus:outline-none 
                    shadow-md resize-none'
                    rows={2}
                    placeholder='Type your AI prompt here...'
                />

                <button
                    onClick={submitToOpenAi}
                    disabled={disableGenerateButton}
                    className={`absolute bottom-4 right-6 px-5 py-2 rounded-3xl
                        shadow-lg 
                        ${disableGenerateButton
                            ? 'bg-linear-to-b from-[#1E5631] via-[#0F3B22] to-[#062B18] cursor-not-allowed opacity-80'
                            : 'bg-linear-to-b from-[#00FF8C] via-[#0F4C2E] to-[#00FF8C] hover:opacity-90 cursor-pointer'
                        }`}>
                    {isGenerating ? 'Generating...' : (
                        <Sparkles className='h-auto w-full text-white' />
                    )}
                </button>
            </div>

            {/**Display the image */}
            {generatedUrl.map((url, index) => (
                <Image
                    key={index}
                    src={url}
                    alt={`generated-${index}`}
                    width={512}
                    height={512}
                    className='p-4'
                />
            ))}
        </>
    )
}