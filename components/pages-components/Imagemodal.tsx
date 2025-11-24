import { StaticImageData } from 'next/image'
import Image from 'next/image'

type Imagemodal = {
    isOpen: boolean
    onClose: () => void
    selectedImageIndex: null | number
    imagesArray: StaticImageData[]
}


export default function Imagemodal({ isOpen, onClose, selectedImageIndex, imagesArray }: Imagemodal) {
    console.log(selectedImageIndex)
    if (!isOpen || selectedImageIndex === null) {
        return null
    }
    const image = imagesArray[selectedImageIndex]

    return (
        <div className='fixed bg-black/70 inset-0 flex items-center 
        justify-center p-4 z-50'>
            <div className='relative'>
                <Image
                    src={image}
                    alt="expanded image"
                    className='max-w-full max-h-screen rounded-lg'
                />
                <button
                    onClick={onClose}
                    className='absolute top-2 right-1 bg-black/50 text-white 
                px-3 py-1 rounded cursor-pointer'>
                    X
                </button>
            </div>

        </div>

    )
}