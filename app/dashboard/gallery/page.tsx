'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useFetchGallery } from '@/hooks/useFetchGallery'
import { Loader2 } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

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

    useEffect(() => {
        if (!isLoaded) return
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }, [isLoaded, inView, hasNextPage, isFetchingNextPage, fetchNextPage])

    if (!isLoaded) {
        return (
            <div className='flex items-center justify-center'>
                <Skeleton />
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <Skeleton />
            </div>
        )
    }

    if (isError) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <p className='text-red-500'>Error loading gallery</p>
            </div>
        )
    }

    const allImages = data?.pages.flatMap(page => page.data) ?? []

    if (allImages.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center min-h-screen'>
                <h2 className='text-2xl font-bold text-green-700'>No images yet</h2>
                <p className='text-gray-400 mt-2'>Start creating!</p>
            </div>
        )
    }

    return (
        <div className='mx-auto px-6 py-8'>
            <h1 className='text-3xl font-bold text-green-700 mb-8'>Gallery</h1>

            {/* Responsive Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {allImages.map(image => (
                    <div
                        key={image.id}
                        className='relative aspect-square overflow-hidden rounded-lg 
                        bg-gray-900 hover:ring-2 hover:ring-green-700 transition'
                    >
                        <Image
                            src={image.image_url}
                            alt={image.prompt || 'Generated image'}
                            fill
                            className='object-cover'
                            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                        />
                    </div>
                ))}
            </div>

            {/* Infinite scroll trigger */}
            <div ref={ref} className='py-8 flex justify-center'>
                {isFetchingNextPage && (
                    <Loader2 className='w-6 h-6 animate-spin text-green-700' />
                )}
                {!hasNextPage && allImages.length > 0 && (
                    <p className='text-gray-500'>You reached the end</p>
                )}
            </div>
        </div>
    )
}