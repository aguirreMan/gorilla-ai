'use client'
import { Button } from '../ui/button'
import Link from 'next/link'


export default function Dashboardnav() {

    return (
        <nav className='fixed top-0 right-0 left-72 z-10 h-16 border-b border-border
        bg-background/80 backdrop-blur'>
        <div className='flex flex-row h-full items-center justify-start px-6'>
          <Link href='/dashboard'>
            <Button size='sm'>
              Gorilla Ai
            </Button>
          </Link>

          </div>
        </nav>
    )
}
