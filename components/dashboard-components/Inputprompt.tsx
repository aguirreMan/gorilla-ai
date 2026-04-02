'use client'
import { useState, KeyboardEvent } from 'react'
import { useImagesContext } from '@/context/ImageSettingsProvider'
import { Sparkles } from 'lucide-react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { pricingCreditsUsed } from '@/lib/pricing/pricing'
import { useUserCredits } from '@/hooks/images/useUserCredits'

interface InputPromptProps {
    onGenerate: (params: {
        prompt: string
        model: string
        size: string
    }) => void
    isGenerating: boolean
}

export default function Inputprompt({ onGenerate, isGenerating }: InputPromptProps) {
  const { model, imageSize } = useImagesContext()
  const [userPrompt, setUserPrompt] = useState('')
  const { data: credits } = useUserCredits()


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
        size: imageSize
      })

    setUserPrompt('')
  }

  const costOfImage = pricingCreditsUsed(model)
  const cannotAfford = (credits?.creditsRemaining ?? 0) < costOfImage

  const disableGenerateButton = userPrompt.trim() === '' || isGenerating || cannotAfford

  return (
    <>
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
      className='absolute bottom-3 right-3 h-10 w-24 rounded-full'>

      {isGenerating ? (
        <span className='text-xs'>...</span>
          ) : (
            <div className='flex  items-center justify-center gap-4'>
                <Sparkles className='h-3 w-4' />
                <span className='text-[10px]'>{costOfImage} coins</span>
           </div>
      )}
    </Button>
    </div>
      {cannotAfford && (
        <p className='text-[10px] text-destructive absolute -bottom-5 right-2'>
          Insufficient Coins
        </p>
      )}
  </>
  )
}
