import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export default function SignInPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#07120D]">
            <SignIn
                appearance={{
                    baseTheme: dark,
                    variables: {
                        colorPrimary: '#15803d', // Your Green-700 branding
                        colorBackground: '#0F1712', // Slightly lighter than your page bg
                        colorInputBackground: '#07120D',
                        colorInputForeground: '#ffffff',
                    },
                    elements: {
                        rootBox: 'mx-auto',
                        card: 'shadow-2xl border border-green-900/20',
                        headerTitle: 'text-green-500',
                    },
                }}
                signUpUrl='/sign-up'
            />
        </div>
    )
}