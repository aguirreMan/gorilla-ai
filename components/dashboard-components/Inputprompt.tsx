'use client'
import { useState, KeyboardEvent } from 'react'
import { useImagesContext } from '@/context/ImageSettingsProvider'
import { Sparkles } from 'lucide-react'

interface InputPromptProps {
    onGenerate: (params: { prompt: string; model: string; size: string; n: number }) => void
    isGenerating: boolean
}

export default function Inputprompt({ onGenerate, isGenerating }: InputPromptProps) {
    const { model, imageSize, numberOfImages } = useImagesContext()
    const [userPrompt, setUserPrompt] = useState<string>('')

    const disableGenerateButton = userPrompt.trim() === '' || isGenerating

    function submitOnEnter(event: KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            handleSubmit()
        }
    }

    function handleSubmit() {
        if (disableGenerateButton) return

        onGenerate({
            prompt: userPrompt,
            model,
            size: imageSize,
            n: numberOfImages
        })

        setUserPrompt('')
    }

    return (
        <div className='flex justify-center items-center mt-0 px-4 w-full max-w-3xl mx-auto relative'>
            <textarea
                onChange={(e) => setUserPrompt(e.target.value)}
                onKeyDown={submitOnEnter}
                value={userPrompt}
                disabled={isGenerating}
                className='w-full border rounded-3xl text-white pt-4 pl-4
                    text-lg focus:outline-none shadow-md resize-none'
                rows={2}
                placeholder='Type your AI prompt here...'
            />

            <button
                onClick={handleSubmit}
                disabled={disableGenerateButton}
                className={`absolute bottom-4 right-6 px-5 py-2 rounded-3xl shadow-lg 
                    ${disableGenerateButton
                        ? 'bg-linear-to-b from-[#1E5631] via-[#0F3B22] to-[#062B18] cursor-not-allowed opacity-80'
                        : 'bg-linear-to-b from-[#00FF8C] via-[#0F4C2E] to-[#00FF8C] hover:opacity-90 cursor-pointer'
                    }`}>
                {isGenerating ? 'Generating...' : <Sparkles className='h-auto w-full text-white' />}
            </button>
        </div>
    )
}