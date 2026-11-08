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
          href="/"
          className="absolute left-6 top-6 z-10 rounded-sm
    text-sm font-medium text-muted-foreground
    transition-colors hover:text-foreground
    focus-visible:outline-2 focus-visible:outline-offset-4
    focus-visible:outline-primary"
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
              Your personal AI workspace
            </p>
          </div>
          {children}
        </div>
      </div>
    </ClerkProvider>
  )
}
