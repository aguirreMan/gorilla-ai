import { useInfiniteQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/supabaseClient'
import { SupabaseGenerationsData } from '@/lib/supabase/saveImages'

const imagesPerPage = 12

export function useFetchGallery(userId: string | undefined) {
    return useInfiniteQuery({
        queryKey: ['gallery', userId],
        enabled: !!userId,
        initialPageParam: 0,
        queryFn: async ({ pageParam = 0 }) => {
            if (!userId) return { data: [], hasMore: false }

            const dataFrom = pageParam * imagesPerPage
            const dataTo = dataFrom + imagesPerPage - 1

            const { data, error, count } = await supabase
                .from('generations')
                .select('*', { count: 'exact' })
                .eq('user_id', userId)
                .order('created_at', { ascending: false })
                .range(dataFrom, dataTo)

            if (error) {
                console.error('Gallery fetched failed', error.message)
                throw error
            }
            return {
                data: data as SupabaseGenerationsData[],
                hasMore: (count ?? 0) > dataTo + 1
            }
        },
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage.hasMore) return null
            return allPages.length
        },
        staleTime: 1000 * 60 * 5
    })
}