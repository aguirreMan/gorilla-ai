import { SignIn } from '@clerk/nextjs'
import { shadcn } from '@clerk/themes'
import Image from 'next/image'
import GorillaFlux from '@/public/assets/gorilla-flux.jpg'

export default function SignInPage() {
    return (
        <div className='min-h-screen grid grid-cols-1 md:grid-cols-2'>

            {/* Left Image */}
            <div className='relative hidden md:block'>
                <Image
                    src={GorillaFlux}
                    alt='Gorilla AI'
                    fill
                    className='object-cover'
                    priority
                />

                {/* Gradient layer */}
                <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent' />

                {/* Text overlay*/}
                <div className='absolute inset-0 z-10 flex items-center justify-center px-10'>
                    <h1 className='text-foreground text-4xl font-semibold tracking-tight text-center max-w-md'>
                        Unleash the power of Gorilla AI
                    </h1>
                </div>
            </div>

            {/**Right Column clerk component here */}
            <div className='flex items-center justify-center bg-background'>
                <div className='w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg'>
                    <SignIn
                        appearance={{
                            theme: shadcn,
                            variables: {
                                colorPrimary: 'var(--primary)',
                                colorBackground: 'var(--background)',
                                colorText: 'var(--foreground)',
                                colorInputBackground: 'var(--input)',
                                colorInputText: 'var(--foreground)',
                                colorBorder: 'var(--border)'
                            },
                        }}
                        signUpUrl='/sign-in'
                    />
                </div>
            </div>
        </div>
    )
}