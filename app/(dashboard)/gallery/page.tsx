'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useFetchGallery } from '@/hooks/images/useFetchGallery'
import { Loader2 } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter } from 'next/navigation'

export default function GalleryPage() {
    const { user, isLoaded } = useUser()

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError
    } = useFetchGallery(isLoaded ? user?.id : undefined)


    const { ref, inView } = useInView({
        rootMargin: '200px',
        threshold: 0,
    })
    const router = useRouter()

    useEffect(() => {
        if (!isLoaded) return
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }, [isLoaded, inView, hasNextPage, isFetchingNextPage, fetchNextPage])

    if (!isLoaded || isLoading) {
        return (
            <div className='flex min-h-[60vh] items-center justify-center'>
                <Skeleton className='h-48 w-48' />
            </div>
        )
    }

    if (isError) {
        return (
            <div className='flex min-h-[60vh] items-center justify-center text-sm
            text-muted-foreground'>
                Failed to load gallery.
            </div>
        )
    }

    const allImages = data?.pages.flatMap(page => page.data) ?? []

    if (allImages.length === 0) {
        return (
            <div className='flex min-h-[60vh] flex-col items-center justify-center text-center'>
                <h2 className='text-lg font-medium text-foreground'>
                    No images yet
                </h2>
                <p className='mt-2 text-sm text-muted-foreground'>
                    Generate your first image to see it here.
                </p>
            </div>
        )
    }

    return (
        <div className='mx-auto px-6 py-6'>
            <h1 className='mb-6 text-lg font-medium text-foreground'>Gallery</h1>

            {/* Responsive Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {allImages.map(image => (
                    <div
                        key={image.id}
                        onClick={() => router.push(`/gallery/${image.id}`)}
                        className='group relative aspect-square overflow-hidden rounded-lg
                        border border-border bg-muted transition'
                    >
                        <Image
                            src={image.image_url}
                            alt={image.prompt || 'Generated image'}
                            fill
                            className='object-cover transition-transform group-hover:scale-[1.02]'
                            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                        />
                    </div>
                ))}
            </div>

            {/* Infinite scroll trigger */}
            <div ref={ref} className='py-8 flex justify-center'>
                {isFetchingNextPage && (
                    <Loader2 className='w-6 h-6 animate-spin text-muted-foreground' />
                )}
                {!hasNextPage && allImages.length > 0 && (
                    <p className='text-md text-muted-foreground'>You reached the end</p>
                )}
            </div>
        </div>
    )
}
