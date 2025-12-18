'use client'
import Image from 'next/image'

interface ImageGeneratingModalProps {
    open: boolean
    loading: boolean
    images: string[]
    onClose: () => void
}

export default function ImagecreationModal({
    open,
    loading,
    images,
    onClose
}: ImageGeneratingModalProps) {
    if (!open) return null

    return (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
            <div className='bg-[#111] p-4 rounded-xl w-[90%] max-w-2xl text-white relative'>
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 text-gray-400 hover:text-white"
                >
                    X
                </button>
                {loading && (
                    <div className="py-10 text-center text-xl">
                        Generating image...
                    </div>
                )}
                {!loading && images.length > 0 && (
                    <div className="grid grid-cols-1 gap-4">
                        {images.map((url, index) => (
                            <Image
                                key={index}
                                src={url}
                                height={500}
                                width={500}
                                alt='generated image'
                                unoptimized
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}