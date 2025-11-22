import Imageslider from '@/components/pages-components/Imageslider'

export default async function FeaturedImages() {
    return (
        <div className='mt-32 flex flex-col justify-center items-center gap-4'>
            <h1 className='text-4xl text-green-800'>Creative Art created by Creators!</h1>
            <Imageslider />
        </div>
    )
}
