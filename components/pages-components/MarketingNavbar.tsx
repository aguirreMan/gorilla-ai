import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NavbarMarketing() {
  return (
    <header className='border-b border-border bg-background'>
      <a href='#main-content' className='sr-only z-50 rounded-md bg-foreground px-4 py-3 text-background focus:not-sr-only focus:absolute focus:left-4 focus:top-4'>Skip to content</a>
      <nav aria-label='Main navigation' className='mx-auto flex min-h-20 max-w-6xl flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-4 sm:px-6'>
        <Link href='/' aria-label='Gorilla AI home' className='rounded-sm text-base font-semibold tracking-tight text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground sm:text-lg'>Gorilla AI<span aria-hidden='true' className='text-primary'>.</span></Link>
        <div className='flex items-center gap-1 sm:gap-3'>
          <Button asChild variant='ghost' className='min-h-11 px-3 text-muted-foreground'><Link href='/sign-in'>Sign in</Link></Button>
          <Button asChild variant='outline' className='min-h-11 px-3 sm:px-4'><Link href='/dashboard'>Open workspace</Link></Button>
        </div>
      </nav>
    </header>
  )
}
