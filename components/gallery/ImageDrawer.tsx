'use client'

import { useRouter } from 'next/navigation'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react'
import { AiGeneratedImageCard } from '@/components/gallery/AiGeneratedImageCard'
import { SupabaseGenerationsData } from '@/types/supabaseTypes'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

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
  const router = useRouter()

  function closeImageDrawer() {
    router.push('/gallery')
  }

  return (
    <Drawer
      open
      onOpenChange={(open) => {
        if (!open) closeImageDrawer()
      }}
    >
      <DrawerContent className='max-h-[90vh]'>
        <div className='w-full overflow-y-auto'>
          <DrawerHeader>
            <VisuallyHidden asChild>
              <DrawerTitle className='flex items-center gap-2'>
                {image?.prompt ?? 'Image Details'}
              </DrawerTitle>
            </VisuallyHidden>
          </DrawerHeader>
          <div className='p-6'>
            {/**Loading state */}
            {isLoading && (
              <div className='flex flex-col items-center justify-center py-16 space-y-4'>
                <Loader2 className='w-10 h-10 animate-spin text-shadow-foreground' />
                <p className='text-foreground'>Loading image ...</p>
              </div>
            )}

            {/**Error State */}
            {isError && (
              <div className='flex flex-col items-center justify-center py-16 text-center'>
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
              <AiGeneratedImageCard image={image} />
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
