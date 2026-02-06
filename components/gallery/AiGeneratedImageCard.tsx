import Image from 'next/image'
import { Card, CardContent } from '../ui/card'

interface AiGeneratedImageCardProps {
  src: string
  alt: string
}

export function AiGeneratedImageCard({src, alt}: AiGeneratedImageCardProps) {
  return (
        <Card className='w-full bg-background transition-shadow border-none hover:shadow-lg'>
            <CardContent className='p-0 '>
                  <div className='relative w-full aspect-square max-h-[90vh]'>
                      <Image
                          src={src}
                          alt={alt}
                          fill
                          className='object-contain rounded-md'
                          sizes='(max-width: 768px) 100vw, 80vw'
                      />
                  </div>
            </CardContent>
        </Card>
    )
}
