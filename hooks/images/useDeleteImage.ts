import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'


export function useDeleteImage(userId: string | undefined) {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: async (imageId: string) => {
            const response = await fetch(`/api/image-creations/${imageId}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error || 'Failed to delete image')
            }
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gallery', userId] })
            toast.success('Image deleted successfully!')
        },
        onError: (error: Error) => {
            console.error('delete error:', error)
            toast.error(error.message || 'Failed to delete image')
        },
        onSettled: () => {
            router.replace('/gallery')
        }
    })
}
