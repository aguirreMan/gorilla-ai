import Image from 'next/image'
import { X } from 'lucide-react'

interface FullScreenImageViewerProps{
  src: string
  alt: string
  onClose: () => void
}

export default function FullScreenImageViewer({ alt, src, onClose }: FullScreenImageViewerProps) {
  return(
  <div className='relative w-screen h-screen flex items-center justify-center'>
    <X onClick={onClose} className='absolute top-4 right-6 cursor-pointer' />
    <div className='relative w-screen h-full max-h-[90vh]'>
      <Image
        src={src}
        alt={alt}
        fill
        className='object-contain'
        sizes='90vw'
      />
    </div>
  </div>
  )
}
