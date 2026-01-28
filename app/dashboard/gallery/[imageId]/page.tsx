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

export default function ImageDrawer({ imageId }: { imageId: string }) {
    const router = useRouter()
    const { user, isLoaded } = useUser()

    const userId = isLoaded ? user?.id : undefined

    const { isLoading, isError } = useFetchGallery(userId)

    const singleImage = useSelectGalleryImage(imageId, userId)

    function closeImageDrawer() {
        router.push('/gallery')
    }

    return (
        <Drawer open onOpenChange={(open) => { if (!open) closeImageDrawer() }}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Image details</DrawerTitle>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    )
}