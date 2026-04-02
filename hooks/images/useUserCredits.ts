import { useQuery } from '@tanstack/react-query'

export function useUserCredits() {
  return useQuery({
    queryKey: ['credits'],
    queryFn: async () => {
      const response = await fetch('/api/credits')
      console.log('STATUS:', response)

      if (!response.ok) {
        throw new Error('Failed to fetch your credits')
      }
      return response.json()
    },
    staleTime: 60 * 1000
  })
}
