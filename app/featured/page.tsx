import Imageslider from '@/components/pages-components/Imageslider'

export default function FeaturedImages() {
    return (
        <div className='relative flex flex-col justify-center items-center
         gap-4 bg-linear-to-b from-[#0f1f14] via-[#0b1310] to-black'>
            <h1 className='text-4xl pt-28 text-green-800 sm:text-nowrap'>Creative Art created by Creators!</h1>

            <section className='w-full px-0 left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]'>
                <Imageslider />
            </section>
        </div>
    )
}