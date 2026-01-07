'use client'
import Image from 'next/image'
import { SupabaseGenerationsData } from '@/lib/supabase/saveImages'
import {
    Dialog,
    DialogContent,
    DialogTitle
} from '@/components/ui/dialog'

interface ImageGeneratingModalProps {
    open: boolean
    loading: boolean
    images: (SupabaseGenerationsData & { url: string })[]
    onClose: () => void
}

export default function ImagecreationModal({
    open,
    loading,
    images,
    onClose
}: ImageGeneratingModalProps) {

    return (
        <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
            <DialogContent
                className='bg-[#111] text-white max-w-3xl p-0 overflow-hidden'>
                <DialogTitle>
                    Image Generation Result
                </DialogTitle>

                {/* Loading State */}
                {loading && (
                    <div className="py-10 text-center text-lg">
                        Generating image...
                    </div>
                )}
                {/* Image area */}
                {!loading && images.length > 0 && (
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        {images.map((image, index) => (
                            <Image
                                key={index}
                                src={image.url}
                                height={500}
                                width={500}
                                alt='generated image'
                                className='rounded-lg object-cover'
                            />
                        ))}
                    </div>
                )}

            </DialogContent>
        </Dialog>
    )
}