'use client'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useUserCredits } from '@/hooks/images/useUserCredits'
import { Coins } from 'lucide-react'


export default function Dashboardnav() {
  const { data: credits, isLoading } = useUserCredits()
  //console.log(credits)
  //console.log('Loading:', isLoading)
  return (
    <nav className='fixed top-0 right-0  w-full z-10 h-16 border-b border-border
      bg-background/80 backdrop-blur'>
      <div className='flex flex-row h-full items-center justify-between px-6'>
        <Link href='/dashboard'>
          <Button size='lg' variant='link' className='font-sfont-semibold border-primary'>
            Gorilla Ai
          </Button>
        </Link>
        <span>
          {isLoading ? (
          <div className='h-8 w-20' />
            ) : (
              <div className='flex items-center gap-2 px-3 py-1 bg-secondary rounded-full text-sm font-medium'>
                <Coins className='w-4 h-4 text-yellow-500' />
                <span>{credits?.creditsRemaining ?? 0}</span>
              </div>
            )}
        </span>
      </div>
    </nav>
  )
}
