'use client'

import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { useFetchGallery } from '@/hooks/useFetchGallery'
import { useSelectGalleryImage } from '@/hooks/useSelectGalleryImage'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react'

export default function ImageDrawer({ imageId }: { imageId: string }) {
    const router = useRouter()
    const { user, isLoaded: clerkLoaded } = useUser()

    const userId = clerkLoaded ? user?.id : undefined

    const { isLoading, isError } = useFetchGallery(userId)

    const singleImage = useSelectGalleryImage(imageId, userId)

    function closeImageDrawer() {
        router.push('/gallery')
    }

    const isSearching = !clerkLoaded || (isLoading && !singleImage)

    const notFound = clerkLoaded && !isLoading && !singleImage

    return (
        <Drawer open onOpenChange={(open) => { if (!open) closeImageDrawer() }}>
            <DrawerContent className='max-h-[90vh]'>
                <div className='max-auto w-full max-w-4xl overflow-y-auto'>
                    <DrawerHeader>
                        <DrawerTitle className='flex items-center gap-2'>
                            {singleImage?.prompt ?? 'Image Details'}
                        </DrawerTitle>
                    </DrawerHeader>
                    <div className='p-6'>
                        {/**Loading state */}
                        {isSearching && (
                            <div className='flex flex-col items-center justify-center py-16 space-y-4'>
                                <Loader2 className='w-10 h-10 animate-spin text-shadow-foreground' />
                                <p className='text-foreground'>Locating your {imageId}</p>
                            </div>
                        )}

                        {/**Error State */}
                        {(isError || notFound) && (
                            <div className='flex flex-col items-center justify-center py-16 text-center'>
                                <AlertCircle className='w-12 h-12 mb-4' />
                                <h3 className='text-xl font-semibold'>Your image is not found</h3>
                                <p className='text-muted-foreground mb-6'>
                                    We could not find this specific generation in your gallery.
                                </p>
                                <Button onClick={closeImageDrawer} variant='outline'>
                                    <ArrowLeft className='w-4 h-4 mr-2' />
                                    Back to Gallery
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}