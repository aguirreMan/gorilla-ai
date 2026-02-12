'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Skeleton } from '../ui/skeleton'
import { Button } from '@/components/ui/button'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import { AiGeneratedImageCard } from '@/components/gallery/AiGeneratedImageCard'
import { ImageCardStats } from './ImageCardStats'
import { SupabaseGenerationsData } from '@/types/supabaseTypes'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import PortalOverlay from './PortalOverlay'
import FullScreenImageViewer from './FullScreenImageViewer'

interface ImageDrawerProps {
  image: SupabaseGenerationsData | null
  isLoading: boolean
  isError: boolean
}

export default function ImageDrawer({
  image,
  isLoading,
  isError,
}: ImageDrawerProps) {

  const [fullScreenImageViewer, setFullScreenImageViewer] = useState(false)
  const router = useRouter()

  function renderFullScreenImageViewer() {
    setFullScreenImageViewer(true)
  }

  function closeImageDrawer() {
    router.push('/gallery')
  }

  return (
    <>
    <Drawer
      open
      onOpenChange={(open) => {
        if (!open && !fullScreenImageViewer) closeImageDrawer()
      }}
    >
      <DrawerContent className='max-h-screen'>
        <div className='w-full max-h-[calc(100vh-2rem)] overflow-y-auto p-4'>
          <VisuallyHidden>
            <DrawerTitle>{image?.prompt}</DrawerTitle>
          </VisuallyHidden>

           {/**Loading state */}
          <div className='p-4 min-h-full'>
            {isLoading && <DrawerSkeleton />}

            {/**Error State */}
            {isError && (
              <div className='flex flex-col flex-1 items-center justify-center py-16 text-center'>
                <AlertCircle className='w-12 h-12 mb-4' />
                <h3 className='text-xl font-semibold'>
                  Your image is not found
                </h3>
                <p className='text-muted-foreground mb-6'>
                  We could not find this specific generation in your gallery.
                </p>
                <Button onClick={closeImageDrawer} variant='outline'>
                  <ArrowLeft className='w-4 h-4 mr-2' />
                  Back to Gallery
                </Button>
              </div>
            )}

            {/**Success States */}
            {image && !isLoading && !isError && (
              <div className='flex flex-col lg:flex-row gap-6 w-full h-full'>
                <div className='lg:flex-3 min-w-0'>
                  <AiGeneratedImageCard
                    src={image.image_url}
                    alt={image.prompt}
                    onClick={renderFullScreenImageViewer}
                  />
                </div>
                <div className='lg:shrink-0 lg:overflow-y-auto lg:max-h-[calc(100vh-4rem)]'>
                  <ImageCardStats image={image} />
                </div>
              </div>
           )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>

    <PortalOverlay
      isOpen={fullScreenImageViewer}
        onClose={() => setFullScreenImageViewer(false)}
      >
        {image && (
          <FullScreenImageViewer
            src={image.image_url}
            alt={image.prompt}
            onClose={() => setFullScreenImageViewer(false)}
            />
        )}
      </PortalOverlay>
      </>
  )
}

function DrawerSkeleton() {
  return (
    <div className='flex flex-col lg:flex-row gap-6'>
      <div className='flex-1'>
        <Skeleton className='w-full aspect-square rounded-lg' />
      </div>
      <div className='w-full lg:max-w-sm flex flex-col gap-4'>
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-40 w-full' />
        <Skeleton className='h-12 w-full' />
      </div>
    </div>
  )
}
