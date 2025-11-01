import Banner from './components/Banner'
import Image from 'next/image'
import Gorilla from '../public/assets/super-gorilla.jpg'

export default function Home() {
  return (
    <div className='relative h-[150vh] w-full '>
      <Image
        src={Gorilla}
        alt='super-gorilla'
        fill
        priority
        sizes='100vw'
        className='object-cover'
      />
      <Banner />
    </div>
  )
}