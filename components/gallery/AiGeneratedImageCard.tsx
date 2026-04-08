import Image from 'next/image'
import { Card, CardContent } from '../ui/card'

export interface AiGeneratedImageCardProps {
  src: string
  alt: string
  onClick: () => void
}

export default function AiGeneratedImageCard({src, alt, onClick}: AiGeneratedImageCardProps) {
  return (
    <Card className='w-full bg-background transition-shadow border-none hover:shadow-lg'>
      <CardContent className='p-0 '>
        <div onClick={onClick} className='relative w-full aspect-square max-h-[90vh]'>
          <Image
            src={src}
            alt={alt}
            fill
            className='object-contain rounded-md cursor-pointer'
            sizes='(max-width: 768px) 100vw, 80vw'
          />
        </div>
      </CardContent>
    </Card>
  )
}
