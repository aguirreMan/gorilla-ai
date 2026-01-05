import { ClerkProvider } from '@clerk/nextjs'

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <div className='min-h-screen flex items-center justify-center bg-linear-to-b from-[#07120D] via-[#0F3B22] to-black'>
                {children}
            </div>
        </ClerkProvider>
    )
}