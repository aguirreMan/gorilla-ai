'use client'
import Image from 'next/image'
import { SupabaseGenerationsData } from '@/types/supabaseTypes'
import {
    Dialog,
    DialogContent,
    DialogHeader,
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
            <DialogContent className='max-w-4xl'>
                <DialogHeader>
                    <DialogTitle className='text-lg font-medium'>
                        Generated Images
                    </DialogTitle>
                </DialogHeader>

                {/* Loading State */}
                {loading && (
                    <div className='flex h-64 items-center justify-center text-sm text-mute-foreground'>
                        Generating images...
                    </div>
                )}

                {/* Image results area */}

                {!loading && images.length > 0 && (
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className='relative aspect-square overflow-hidden
                            rounded-lg border border-border bg-muted'
                            >
                                <Image
                                    src={image.url}
                                    alt='generated image'
                                    fill
                                    className='object-cover'
                                />
                            </div>
                        ))}
                    </div>
                )}

            </DialogContent>
        </Dialog>
    )
}