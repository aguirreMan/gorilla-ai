'use client'
import { useUser } from '@clerk/nextjs'
import { ChangeEvent, useState } from 'react'
import ImagesettingsSelect from './ImagesettingsSelect'
import useImageSettings from '@/app/hooks/useImageSettings'
import Image from 'next/image'


export default function Inputprompt() {
    const { user } = useUser()
    const [userPrompt, setUserPrompt] = useState<string>('')
    const [isGenerating, setIsGenerating] = useState<boolean>(false)
    const [generatedUrl, setGeneratedUrl] = useState<string | null>(null)

    const { model, availableModels, chooseModel, chooseImageSize, imageSize, availableSizes } = useImageSettings()

    function allowUsertoInput(event: ChangeEvent<HTMLTextAreaElement>) {
        setUserPrompt(event.target.value)
    }
    const disableGenerateButton = userPrompt.trim() === '' || isGenerating

    async function submitToOpenAi() {
        if (disableGenerateButton) return
        setIsGenerating(true)
        console.log('Sending to API:', { prompt: userPrompt, model, size: imageSize })

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
                    n: 1
                })
            })
            if (!response.ok) {
                throw new Error('Failed to generate your image')
            }
            const openaiData = await response.json()
            setGeneratedUrl(openaiData.data[0].url)
        } catch (error) {
            console.error('Error generating image:', error)
            alert('Failed to generate image. Please try again.')
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <>
            <div className='flex flex-col justify-center items-center mt-0 gap-2'>
                <h1 className='text-lg text-black font-bold mb-4'>
                    Hi {user?.firstName} what do you want to create today?
                </h1>
            </div>

            <div className='flex gap-4 justify-center items-center mb-4 px-4 max-w-3xl mx-auto'>
                <ImagesettingsSelect
                    label='Model'
                    currentValue={model}
                    options={availableModels}
                    onChange={chooseModel}
                />
                <ImagesettingsSelect
                    label='Image size'
                    currentValue={imageSize}
                    options={availableSizes}
                    onChange={chooseImageSize}
                />
            </div>

            <div className='flex justify-center items-center mt-0 px-4 w-full max-w-3xl mx-auto relative'>
                <textarea
                    onChange={allowUsertoInput}
                    value={userPrompt}
                    disabled={isGenerating}
                    className='w-full border-2 border-blue-300 pt-4 pl-4
                    text-lg focus:outline-none 
                    focus:ring-4 focus:ring-blue-300 shadow-md resize-none 
                    transition duration-200 ease-in-out'
                    rows={6}
                    placeholder='Type your AI prompt here...'
                />

                <button
                    onClick={submitToOpenAi}
                    disabled={disableGenerateButton}
                    className={`absolute bottom-4 right-6 px-5 py-2 rounded-lg
                        shadow-lg 
                        ${disableGenerateButton
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-500 cursor-pointer hover:bg-green-600'
                        }`}>
                    {isGenerating ? 'Generating...' : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                        </svg>
                    )}
                </button>
            </div>

            {/**Display the image */}
            {generatedUrl && (
                <div className='mt-12 w-full px-4 max-w-3xl mx-auto'>
                    <Image src={generatedUrl} alt='generated'
                        className='rounded-lg shadow-lg mx-auto'
                        width={1024}
                        height={1024} />
                </div>
            )}
        </>
    )
}