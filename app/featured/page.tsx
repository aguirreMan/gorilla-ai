import Imageslider from '@/components/pages-components/Imageslider'

export default async function FeaturedImages() {
    return (
        <div className='min-h-screen  relative flex flex-col justify-center items-center
         gap-4 bg-linear-to-b from-[#0f1f14] via-[#0b1310] to-black'>
            <h1 className='text-4xl text-green-800 sm:text-nowrap'>Creative Art created by Creators!</h1>
            <Imageslider />
        </div>
    )
}