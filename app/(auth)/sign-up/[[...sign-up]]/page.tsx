import { SignUp } from '@clerk/nextjs'
import { shadcn } from '@clerk/themes'

export default function SignUpPage() {
    return (
        <div className='min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#07120D]'>
            {/**Left column */}
            <div className='hidden md:flex flex flex-col justify-center px-12 text-white'>
                <h1 className='text-4xl font-bold mb-4'>
                    Unleash the Power of Gorilla AI
                </h1>
                <p className='text-white/70 max-w-md'>
                    Generate AI images, manage your gallery, and control your creations.
                </p>
            </div>
            {/**Right Column clerk component here */}
            <div className='flex items-center justify-center'>
                <SignUp
                    appearance={{
                        theme: shadcn,
                        variables: {
                            colorPrimary: '#15803d',
                            colorBackground: '#0F1712',
                            colorInputBackground: '#07120D',
                            colorInputForeground: '#ffffff',
                        },
                        elements: {
                            card: 'shadow-2xl border border-green-900/20',
                            headerTitle: 'text-white',
                            footer: 'bg-green-400',
                            footerActionText: 'text-white/60',
                            footerActionLink: 'text-green-500 hover:text-green-400',
                        }
                    }}
                    signInUrl='/sign-in'
                />
            </div>
        </div>
    )
}