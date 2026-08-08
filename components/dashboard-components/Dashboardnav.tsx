'use client'
//import { useChatContext } from '@/context/chatContext'
import Link from 'next/link'

export default function Dashboardnav() {
  //const { deselectChat } = useChatContext()

  return (
    <nav className='fixed top-0 right-0 w-full z-10 h-16 border-b border-border bg-surface/80 backdrop-blur-md'>
      <div className='flex flex-row h-full items-center justify-between px-6'>
        <Link href='/dashboard'>
          <span className='text-lg font-semibold tracking-tight bg-linear-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent'>
            Gorilla AI
          </span>
        </Link>
        <div className='flex flex-row items-center gap-4'>
        </div>
      </div>
    </nav>
  )
}
