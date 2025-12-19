'use client'

import { useState } from 'react'
import {
    Carousel, CarouselContent, CarouselItem, CarouselNext,
    CarouselPrevious
} from '../ui/carousel'
import image1 from '@/public/assets/image-1.png'
import image2 from '@/public/assets/image-2.jpg'
import image3 from '@/public/assets/image-3.jpg'
import image4 from '@/public/assets/image-4.jpg'
import image5 from '@/public/assets/image-5.jpg'
import image6 from '@/public/assets/image-6.jpg'
import Image from 'next/image'
import Imagemodal from '@/components/pages-components/Imagemodal'

export default function Imageslider() {
    const imagesArray = [image1, image2, image3, image6, image4, image5]

    const [openImageModal, setOpenImageModal] = useState(false)
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

    function expandImageModal(index: number) {
        setOpenImageModal(true)
        setSelectedImageIndex(index)
    }
    return (
        <>
            <div className='relative w-full max-w-4xl mx-auto'>
                <Carousel className='w-full'
                    opts={{
                        align: 'center',
                        loop: true,
                        slidesToScroll: 1,
                        dragFree: false
                    }}

                >
                    <CarouselContent>
                        {imagesArray.map((image, index) => (
                            <CarouselItem key={index}
                                className='relative shrink-0 w-[300px] md:w-[350px] mx-2'
                            >
                                <Image
                                    onClick={() => expandImageModal(index)}
                                    src={image}
                                    alt={`Slide ${index + 1}`}
                                    className='w-full rounded-lg cursor-pointer pb-5'
                                    style={{ objectFit: 'cover' }}
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
            </div>
        </>
    )

}