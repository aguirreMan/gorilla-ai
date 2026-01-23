import MarketingModal from '@/components/pages-components/MarketingModal'
import Image from 'next/image'
import Gorilla from '@/public/assets/super-gorilla.jpg'
import Link from 'next/link'

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
          <h1 className='text-[#167a37] text-6xl font-bold text-center'>Power up your creativity</h1>
          <p className='max-w-xl text-3xl text-white text-center mt-4'>
            Leverage AI with powerful tools<br /> to create your dream projects
          </p>
          <Link href='/sign-up'>
            <button className='mt-8 px-6 py-3 rounded-xl 
          text-zinc-100 bg-white/20 cursor-pointer hover:bg-white/30
           transition font-semibold'>
              Start Creating
            </button>
          </Link>
        </div>

        {/* Banner - On Top of content */}
        <div className='relative z-20'>
          <MarketingModal />
        </div>
      </div>
    </>
  )
} 