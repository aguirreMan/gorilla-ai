'use client'
import { useImagesContext } from '@/app/context/ImageSettingsProvider'
import ImagesettingsSelect from '@/components/dashboard-components/ImagesettingsSelect'
import { useUser, useClerk } from '@clerk/nextjs'
import { Folder } from 'lucide-react'
import ImageNumberSlider from '@/components/dashboard-components/ImageNumberSlider'

export default function Sidebar() {
    const { chooseImageSize, chooseModel,
        availableModels, model, availableSizes, imageSize,
        numberOfImages, updateNumberofImagesGenerated,
        availableImageCounts } = useImagesContext()

    const { user } = useUser()
    const { signOut } = useClerk()

    async function signOutPage() {
        await signOut({ redirectUrl: '/' })
    }


    //Write logic for Number slider

    function getNumberOfImagesToGenerate(value: number) {
        updateNumberofImagesGenerated(value)
    }
    //Numbers of Images Minimum and Maximum to get
    const minimumNumber = Math.min(...availableImageCounts)
    const maximumNumber = Math.max(...availableImageCounts)
    console.log("value:", numberOfImages, "min:", minimumNumber, "max:", maximumNumber)


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
                        <ImageNumberSlider
                            value={numberOfImages}
                            min={minimumNumber}
                            max={maximumNumber}
                            step={1}
                            onChange={getNumberOfImagesToGenerate}
                            disabled={false}
                        />
                        <span className='flex justify-center text-white pt-6'>
                            {numberOfImages}
                        </span>
                    </div>
                </div>
            </div>

            <button onClick={signOutPage} className='bg-white rounded-full cursor-pointer'>SignOUt</button>

        </aside>
    )
}