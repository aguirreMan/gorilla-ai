import Image from 'next/image'
import Gorilla from '@/public/assets/super-gorilla.jpg'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <>
      <div className='relative h-[150vh] w-full overflow-hidden'>
        {/* Background Image */}
        <div className='absolute inset-0 z-0'>
          <Image
            src={Gorilla}
            alt='super-gorilla'
            fill
            priority
            sizes='100vw'
            className='object-cover'
          />
        </div>

        {/* Hero Content - Behind Banner */}
        <div className='absolute bottom-[50vh] left-0 right-0 inset-0 z-10 flex flex-col items-center justify-center px-6'>
          <h1 className='text-primary text-5xl md:text-6xl font-semibold tracking-tight'>
              Debug code faster. Learn faster. Keep shipping.
          </h1>
          <p className='max-w-xl text-3xl text-primary-foreground text-center mt-6'>
            Gorilla AI helps developers fix bugs, understand architecture, and learn faster without bloated explanations.
          </p>
          <Button className='mt-4' size='lg' asChild>
            <Link href='/sign-up'>Get started!</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
