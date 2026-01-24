'use client'
import { useState, KeyboardEvent } from 'react'
import { useImagesContext } from '@/context/ImageSettingsProvider'
import { Sparkles } from 'lucide-react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'

interface InputPromptProps {
    onGenerate: (params: {
        prompt: string
        model: string
        size: string
        n: number
    }) => void
    isGenerating: boolean
}

export default function Inputprompt({ onGenerate, isGenerating }: InputPromptProps) {
    const { model, imageSize, numberOfImages } = useImagesContext()
    const [userPrompt, setUserPrompt] = useState('')

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
        <div className='relative mx-auto w-full max-w-3xl'>
            <Textarea
                onChange={(e) => setUserPrompt(e.target.value)}
                onKeyDown={submitOnEnter}
                value={userPrompt}
                disabled={isGenerating}
                rows={3}
                placeholder='Type your AI prompt here...'
                className='pr-24 text-base resize-none'
            />

            <Button
                onClick={handleSubmit}
                disabled={disableGenerateButton}
                size='icon-lg'
                className='absolute bottom-3 right-3 h-10 w-16 rounded-full'>

                {isGenerating ? (
                    <span className='text-xs'>...</span>
                ) : (
                    <Sparkles className='h-4 w-4' />
                )}
            </Button>
        </div>
    )
}