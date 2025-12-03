'use client'
import { useImagesContext } from '@/app/context/ImageSettingsProvider'
import ImagesettingsSelect from '@/components/dashboard-components/ImagesettingsSelect'
import { useUser, useClerk } from '@clerk/nextjs'
import { Folder } from 'lucide-react'
import ImageNumberSlider from '@/components/dashboard-components/ImageNumberSlider'

export default function Sidebar() {
    const { chooseImageSize, chooseModel, availableModels, model, availableSizes, imageSize } = useImagesContext()
    const { user } = useUser()
    // const { signOut } = useClerk()

    /*async function signOutPage() {
        await signOut({ redirectUrl: '/' })
    }
*/
    return (
        <aside className='pt-8 bg-linear-to-b from-[#0f1f14] via-[#0b1310] to-black w-[20%] h-screen fixed flex flex-col justify-start p-4'>
            <div className='flex flex-col h-screen overflow-y-auto'>
                <div className='w-full mb-4 rounded-2xl bg-black backdrop:blur-2xl cursor-pointer p-2 text-center text-white'>
                    Hi, {user?.firstName}
                </div>
                <div className='flex flex-row cursor-pointer bg-amber-500
                w-full border-0 h-auto p-2 rounded-md'>
                    <Folder className='mr-4' /> Library
                </div>
                <div className='pt-6'>
                    <ImagesettingsSelect
                        label='Model'
                        currentValue={model}
                        options={availableModels}
                        onChange={chooseModel}
                    />
                    <div className='pt-6'>
                        <ImagesettingsSelect
                            label='Image size'
                            currentValue={imageSize}
                            options={availableSizes}
                            onChange={chooseImageSize}
                        />
                    </div>
                    <div className='pt-6'>

                    </div>
                </div>
            </div>
        </aside>
    )
}