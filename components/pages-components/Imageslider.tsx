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
import { ChevronRight, ChevronLeft } from 'lucide-react'

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
            <div className='relative w-full overflow-hidden group'>
                <Carousel className='w-full'
                    opts={{
                        align: 'start',
                        loop: true,
                        slidesToScroll: 1,
                        dragFree: false
                    }}
                >
                    <CarouselContent className='-ml-2 md:-ml-4 pb-4 px-12 md:px-16'>
                        {imagesArray.map((image, index) => (
                            <CarouselItem
                                key={index}
                                className='pl-2 md:pl-4 basis-1/2 sm:basis-1/3 
                                md:basis-1/4 lg:basis-1/5 xl:basis-1/6'
                            >
                                <div className='relative aspect-2/3 w-full overflow-hidden 
                                rounded-lg transition-transform duration-200 hover:scale-110 hover:z-10'>
                                    <Image
                                        onClick={() => expandImageModal(index)}
                                        src={image}
                                        alt={`Slide ${index + 1}`}
                                        fill
                                        className=' cursor-pointer object-cover'
                                    />
                                </div>
                            </CarouselItem>
                        ))}

                    </CarouselContent>
                    <CarouselPrevious
                        className='absolute left-0 top-0 h-full w-12 md:w-16 rounded-none bg-black/50 
                        hover:bg-black/80 border-0 opacity-0 group-hover:opacity-100 transition-opacity 
                        duration-300 z-10 cursor-pointer pointer-events-auto'>
                        <ChevronLeft className='h-8 w-8 md:h-12 md:w-12 text-white' />
                    </CarouselPrevious>
                    <CarouselNext
                        className='absolute right-0 top-0 h-full w-12 md:w-16 rounded-none bg-black/50 
                        hover:bg-black/80 border-0 opacity-0 group-hover:opacity-100 transition-opacity 
                        duration-300 z-10 cursor-pointer'
                    >
                        <ChevronRight className='h-8 w-8 md:h-12 md:w-12 text-white' />
                    </CarouselNext>
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