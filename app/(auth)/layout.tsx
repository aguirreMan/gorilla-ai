import { ClerkProvider } from '@clerk/nextjs'
import Link from 'next/link'

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <div className='relative min-h-screen flex items-center justify-center bg-background overflow-hidden'>
        {/* Background glow */}
        <div
          aria-hidden
          className='pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[500px] h-[500px] rounded-full bg-primary/6 blur-[120px]'
        />

      {/* Back to home */}
        <Link
          href='/'
          className='absolute top-6 left-6 z-10 text-sm font-medium text-muted-foreground
        hover:text-foreground transition-colors'
        >
         ← Back to home
        </Link>

      {/* Main content */}
        <div className='relative z-10 w-full max-w-md space-y-6 px-4'>
          <div className='text-center space-y-1'>
            <h1 className='text-2xl font-semibold text-foreground'>
              Gorilla AI
            </h1>
            <p className='text-sm text-muted-foreground'>
              Understand and debug your code faster
            </p>
          </div>
          {children}
        </div>
      </div>
    </ClerkProvider>
  )
}
