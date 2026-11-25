import { Skeleton } from '@/components/ui/skeleton'

export default function AuthSkeleton() {
    return (
        <div
            role='status'
            className='mx-auto w-full max-w-[400px] overflow-hidden rounded-xl border bg-card shadow-sm'
        >
            <span className='sr-only'>
                Loading Authentication
            </span>

            <div aria-hidden='true'>
                <div className='flex flex-col gap-8 px-10 py-8'>
                    <div className='flex flex-col items-center gap-2'>
                        <Skeleton className='h-5 w-48' />
                        <Skeleton className='h-4 w-full max-w-64' />
                    </div>

                    <Skeleton className='h-9 w-full' />

                    <div className='flex items-center gap-3'>
                        <Skeleton className='h-px flex-1' />
                        <Skeleton className='size-4' />
                        <Skeleton className='h-px flex-1' />
                    </div>

                    <div className='space-y-2'>
                        <Skeleton className='h-4 w-24' />
                        <Skeleton className='h-9 w-full' />
                    </div>

                    <Skeleton className='h-9 w-full' />
                </div>

                <div className='space-y-4 border-t px-10 py-5'>
                    <Skeleton className='mx-auto h-4 w-48' />
                    <Skeleton className='mx-auto h-3 w-24' />
                </div>

            </div>

        </div>

    )
}