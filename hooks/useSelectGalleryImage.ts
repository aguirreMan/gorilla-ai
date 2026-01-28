import { useQueryClient, InfiniteData } from '@tanstack/react-query'
import { SupabaseGenerationsData } from '@/types/supabaseTypes'


interface GalleryPage {
    data: SupabaseGenerationsData[]
    hasMore: boolean
}

export function useSelectGalleryImage(imageId: string, userId: string | undefined) {
    const queryClient = useQueryClient()
    const galleryData = queryClient.getQueryData<InfiniteData<GalleryPage>>(['gallery', userId])

    if (!galleryData) return undefined

    const flatPages = galleryData.pages.flatMap(page => page.data)
    const selectedImage = flatPages.find((image) => image.id === imageId)

    return selectedImage
}