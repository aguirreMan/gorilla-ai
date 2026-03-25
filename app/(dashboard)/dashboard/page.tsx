'use client'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Dashboardnav from '@/components/dashboard-components/Dashboardnav'
import Inputprompt from '@/components/dashboard-components/Inputprompt'
import ImagecreationModal from '@/components/dashboard-components/ImagecreationModal'
import { SupabaseGenerationsData } from '@/types/supabaseTypes'


export default function DashboardPage() {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()

  const [openModal, setOpenModal] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [createdImages, setCreatedImages] = useState<(SupabaseGenerationsData & { url: string })[]>([])

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace('/sign-in')
    }
  }, [isLoaded, isSignedIn, router])

  async function generateImages({ prompt, model, size }: {
    prompt: string
    model: string
    size: string
  }) {
    setOpenModal(true)
    setIsGenerating(true)
    setCreatedImages([])

    try {
      const response = await fetch('/api/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, model, size })
    })

      const json = await response.json() as unknown

      if (!response.ok) {
        const errorData = json as { error?: string }
        toast.error(
          response.status === 400 ? 'Content Policy Violation' : 'Generation Failed',
          { description: errorData.error }
        )
        setOpenModal(false)  // Close modal on error
        return
      }

        const data = json as { data: (SupabaseGenerationsData & { url: string })[] }

        setCreatedImages(data.data)
        toast.success('Image generated', {
          description: 'Added to your gallery',
        })

      } catch (error) {
        console.error('Network error:', error)
        toast.error('Network error. Please try again.')
        setOpenModal(false)
      } finally {
        setIsGenerating(false)
      }
    }

    if (!isLoaded) return <div>Loading...</div>
    if (!isSignedIn) return null

    return (
        <>
            <Dashboardnav />
            <div className='pt-16'>
                <Inputprompt
                    onGenerate={generateImages}
                    isGenerating={isGenerating}
                />
            </div>

            <ImagecreationModal
                open={openModal}
                loading={isGenerating}
                images={createdImages}
                onClose={() => setOpenModal(false)}
            />
        </>
    )
}
