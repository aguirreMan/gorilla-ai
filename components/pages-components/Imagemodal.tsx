import { StaticImageData } from 'next/image'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

type Imagemodal = {
    isOpen: boolean
    onClose: () => void
    selectedImageIndex: null | number
    imagesArray: StaticImageData[]
}

export default function Imagemodal({ isOpen, onClose, selectedImageIndex, imagesArray }: Imagemodal) {
    //Run an effect to prevent background from scrolling
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflowY = 'hidden'
        }
        return () => {
            document.body.style.overflowY = 'auto'
        }
    }, [isOpen])

    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function closeModalOnOutsideClick(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose()
            }
        }

        function closeWithEscapeKey(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', closeModalOnOutsideClick)
            document.addEventListener('keydown', closeWithEscapeKey)
        }
        return () => {
            document.removeEventListener('mousedown', closeModalOnOutsideClick)
            document.removeEventListener('keydown', closeWithEscapeKey)
        }
    }, [isOpen, onClose])



    if (!isOpen || selectedImageIndex === null) {
        return null
    }
    const image = imagesArray[selectedImageIndex]

    return (
        <div className='fixed bg-black/70 inset-0 flex items-center 
        justify-center p-4 z-50'>
            <div ref={modalRef} className='relative'>
                <Image
                    src={image}
                    alt='expanded image'
                    className='max-w-full max-h-screen rounded-lg'
                    height={600}
                    width={600}
                />
                <button
                    onClick={onClose}
                    className='absolute top-2 right-1 bg-black/10 text-white 
                px-3 py-1 rounded cursor-pointer'>
                    X
                </button>
            </div>
        </div>

    )
}