import { Skeleton } from '@/components/ui/skeleton'

export function SidebarSkeleton() {
  return (
    <div className='space-y-1 px-2 py-2'>
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className='w-full rounded-md h-8' />
      ))}
    </div>
  )
}
