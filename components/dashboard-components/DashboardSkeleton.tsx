import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

export default function DashboardSkeleton() {
  return (
    <div className='flex h-[calc(100vh-4rem)]'>
      {/* Sidebar */}
      <div className='w-72 h-full flex flex-col bg-surface border-r border-border shrink-0'>
        <Separator />
        <div className='px-2 py-2 shrink-0'>
          <Skeleton className='h-8 w-full rounded-md' />
        </div>
        <Separator />
        <div className='space-y-1 px-2 py-2 flex-1'>
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className='h-8 w-full rounded-md' />
          ))}
        </div>
        <Separator />
        <div className='p-3 shrink-0'>
          <Skeleton className='h-8 w-full rounded-md' />
        </div>
      </div>

      {/* Main area */}
      <div className='flex flex-col flex-1 min-h-0'>
        <div className='flex-1 overflow-hidden'>
          <div className='max-w-4xl mx-auto space-y-6 pt-8 px-4'>
            <div className='flex justify-end'>
              <Skeleton className='h-10 w-48 rounded-2xl rounded-tr-sm' />
            </div>
            <div className='flex gap-3'>
              <Skeleton className='h-8 w-8 rounded-full shrink-0' />
              <Skeleton className='h-20 w-80 rounded-2xl rounded-tl-sm' />
            </div>
            <div className='flex justify-end'>
              <Skeleton className='h-10 w-36 rounded-2xl rounded-tr-sm' />
            </div>
            <div className='flex gap-3'>
              <Skeleton className='h-8 w-8 rounded-full shrink-0' />
              <Skeleton className='h-14 w-96 rounded-2xl rounded-tl-sm' />
            </div>
          </div>
        </div>

        <div className='px-4 py-3 border-t bg-background'>
          <Skeleton className='h-20 w-full max-w-3xl mx-auto rounded-xl' />
        </div>
      </div>
    </div>
  )
}
