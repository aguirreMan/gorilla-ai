import { SignUp } from '@clerk/nextjs'
import { shadcn } from '@clerk/themes'
import Image from 'next/image'
import GorillaAuth from '@/public/assets/gorilla-night.jpg'

export default function SignUpPage() {
    return (
        <div className='min-h-screen grid grid-cols-1 md:grid-cols-2'>

            {/* Left Image */}
            <div className='relative hidden md:block'>
                <Image
                    src={GorillaAuth}
                    alt='Gorilla AI'
                    fill
                    className='object-cover'
                    priority
                />

                {/* Overlay Text over Image */}
                <div className='absolute inset-0 z-10 flex items-center justify-center'>
                    <h1 className='text-white text-4xl font-bold text-center px-8'>
                        Unleash the power of Gorilla AI
                    </h1>
                </div>
            </div>

            {/* Right column is Clerk component */}
            <div className='flex items-center justify-center bg-[#07120D]'>
                <SignUp
                    appearance={{
                        theme: shadcn,
                        variables: {
                            colorPrimary: '#15803d',
                            colorBackground: '#1d402a',
                        },
                    }}
                    signInUrl='/sign-in'
                />
            </div>

        </div>
    )
}
