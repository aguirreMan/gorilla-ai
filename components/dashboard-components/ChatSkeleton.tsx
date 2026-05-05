import { Skeleton } from '@/components/ui/skeleton'

export default function ChatSkeleton() {
  return (
    <div className='overflow-y-auto min-h-0 flex-1'>
      <div className='max-w-4xl mx-auto space-y-6 pt-8 px-4'>
        {[...Array(6)].map((_, i) => {
          const isUser = i % 2 === 0

          return isUser ? (
            <div key={i} className='flex justify-end'>
              <Skeleton className='h-10 w-40 rounded-2xl rounded-tr-sm' />
            </div>
          ) : (
            <div key={i} className='flex justify-start gap-3'>
              <Skeleton className='h-8 w-8 rounded-full shrink-0' />
              <Skeleton className='h-16 w-72 rounded-2xl rounded-tl-sm' />
            </div>
          )
        })}
      </div>
    </div>
  )
}
