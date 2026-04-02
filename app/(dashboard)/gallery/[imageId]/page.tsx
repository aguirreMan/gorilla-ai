'use client'

import { use } from 'react'
import { useUser } from '@clerk/nextjs'
import { useFetchGallery } from '@/hooks/images/useFetchGallery'
import { useSelectGalleryImage } from '@/hooks/images/useSelectGalleryImage'
import ImageDrawer from '@/components/gallery/ImageDrawer'

export default function GalleryImageRoute({ params }: {
    params: Promise<{ imageId: string }>
}) {

    const resolveParams = use(params)
    const imageId = resolveParams.imageId

    const { user, isLoaded } = useUser()
    const userId = isLoaded ? user?.id : undefined
    const { isLoading, isError } = useFetchGallery(userId)
    const singleImage = useSelectGalleryImage(imageId, userId)

    return (
        <ImageDrawer
            image={singleImage ?? null}
            isLoading={!isLoaded || isLoading}
            isError={isError}
        />
    )
}
