'use client'

import { useState } from 'react'
import {
    Carousel, CarouselContent, CarouselItem, CarouselNext,
    CarouselPrevious
} from '../ui/carousel'
import image1 from '@/public/assets/image-1.png'
import image2 from '@/public/assets/image-2.png'
import image3 from '@/public/assets/image-3.png'
import image4 from '@/public/assets/image-4.png'
import image5 from '@/public/assets/image-5.jpg'
import Image from 'next/image'
import Imagemodal from '@/components/pages-components/Imagemodal'

export default function Imageslider() {
    const imagesArray = [image1, image2, image3, image4, image5]

    const [openImageModal, setOpenImageModal] = useState(false)
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

    function expandImageModal(index: number) {
        setOpenImageModal(true)
        setSelectedImageIndex(index)
    }
    return (
        <>
            <Carousel className='w-full max-w-xs'>
                <CarouselContent>
                    {imagesArray.map((image, index) => (
                        <CarouselItem key={index}>
                            <Image
                                onClick={() => expandImageModal(index)}
                                src={image}
                                alt={`Slide ${index + 1}`}
                                className='w-full h-full cursor-pointer pb-5'
                            />
                        </CarouselItem>
                    ))}

                </CarouselContent>
                <CarouselPrevious className='cursor-pointer' />
                <CarouselNext className='cursor-pointer' />
            </Carousel>
            <Imagemodal
                isOpen={openImageModal}
                onClose={() => setOpenImageModal(false)}
                selectedImageIndex={selectedImageIndex}
                imagesArray={imagesArray}
            />
        </>
    )

}