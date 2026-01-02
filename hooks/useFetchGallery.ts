import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/supabaseClient'
import { SupabaseGenerationsData } from '@/lib/supabase/saveImages'

export function useFetchGallery(userId: string | undefined) {
    return useQuery({
        queryKey: ['gallery', userId],
        enabled: !!userId,
        queryFn: async () => {
            if (!userId) return []
            const { data, error } = await supabase
                .from('generations')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Gallery fetched failed', error.message)
                throw error
            }
            return data as SupabaseGenerationsData[]
        },
        staleTime: 1000 * 60 * 5
    })
}