import Image from 'next/image'
import { Card, CardContent } from '../ui/card'

interface AiGeneratedImageCardProps {
  src: string
  alt: string
}

export function AiGeneratedImageCard({src, alt}: AiGeneratedImageCardProps) {
  return (
        <Card className='w-full bg-background border-none transition-shadow hover:shadow-lg'>
            <CardContent className='p-4 md:p-6'>
                  <div className='relative w-full max-h-[70vh] aspect-square rounded-lg bg-muted/30
                    p-2 overflow-hidden'>
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
