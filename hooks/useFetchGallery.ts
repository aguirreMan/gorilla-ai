//Hook to fetch user gallery images from gallery api no longer supabase

import { useInfiniteQuery } from '@tanstack/react-query'
import { SupabaseGenerationsData } from '@/types/supabaseTypes'

export function useFetchGallery(userId: string | undefined) {
    return useInfiniteQuery({
        queryKey: ['gallery', userId],
        enabled: !!userId,
        initialPageParam: 0,
        queryFn: async ({ pageParam = 0 }) => {
            if (!userId) return { data: [], hasMore: false }

            //console.log(' Querying with userId:', userId)

            const response = await fetch(`/api/gallery?page=${pageParam}`)

            if (!response.ok) {
                throw new Error('Failed to fetch your gallery')
            }

            const galleryResults = await response.json()

            return {
                data: galleryResults.data as SupabaseGenerationsData[],
                hasMore: galleryResults.hasMore
            }
        },
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage.hasMore) return null
            return allPages.length
        },
        staleTime: 1000 * 60 * 5
    })
}