'use client'

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
      <DrawerContent className='overflow-y-auto h-[90vh]'>
        <div className='w-full flex flex-col'>
          <VisuallyHidden>
            <DrawerTitle>{image?.prompt}</DrawerTitle>
          </VisuallyHidden>

           {/**Loading state */}
          <div className='p-4 flex-1'>
            {isLoading && <DrawerSkeleton />}

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
              <DrawerSuccessState image={image} />
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function DrawerSuccessState({ image }: { image: SupabaseGenerationsData }) {
  return (
    <div className='flex flex-col lg:flex-row gap-6 p-4'>
      <div className='flex flex-3 justify-center items-start'>
        <AiGeneratedImageCard
          src={image.image_url}
          alt={image.prompt}
          />
      </div>
      <div className='flex-1'>
        <ImageCardStats image={image} />
      </div>

    </div>
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
