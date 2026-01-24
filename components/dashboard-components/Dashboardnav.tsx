'use client'
import { Button } from '../ui/button'

export default function Dashboardnav() {
    return (
        <nav className='fixed top-0 right-0 left-72 z-10 h-16 border-b border-border
        bg-background/80 backdrop-blur'>
            <div className='flex h-full items-center justify-end px-6'>
                <Button size='sm'>
                    Upgrade
                </Button>

            </div>
        </nav>
    )
}