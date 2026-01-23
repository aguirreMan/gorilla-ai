'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '../ui/dialog'
import { Button } from '@/components/ui/button'

export default function MarketingModal() {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const modalSeen = sessionStorage.getItem('marketing-modal')
        if (modalSeen) return

        const timer = setTimeout(() => {
            setOpen(true)
        }, 1000)

        return () => clearTimeout(timer)

    }, [])

    function closeModal() {
        sessionStorage.setItem('marketing-modal', 'shown')
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={closeModal}>
            <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                    <DialogTitle className='text-xl font-semibold text-foreground flex flex-row justify-center'>
                        Gorilla Coin is coming soon
                    </DialogTitle>
                    <DialogDescription className='mt-4'>
                        Generate Images and videos on your own term save them sell
                        them all accessible on the blockchain
                    </DialogDescription>
                </DialogHeader>
                <div className='mt-6 flex justify-end gap-3'>
                    <Button className='cursor-pointer border-2' variant='ghost' onClick={closeModal}>
                        Dismiss
                    </Button>
                    <Button asChild>
                        <Link href='/research' onClick={closeModal}>
                            Learn more
                        </Link>
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}