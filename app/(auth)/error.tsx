'use client'

import { useEffect } from 'react'
import type { ErrorInfo } from 'next/error'
import { Button } from '@/components/ui/button'
import { CircleAlert } from 'lucide-react'

export default function AuthError({ error, reset }: ErrorInfo) {
    useEffect(() => {
        console.error('Authentication error:', error)
    }, [error])

    return (
        <div className='mx-auto w-full max-w-[400px] rounded-xl
      border bg-card px-10 py-8 text-card-foreground shadow-sm'>

            <div className='flex flex-col items-center gap-6 text-center'>
                <CircleAlert
                    aria-hidden='true'
                    className='size-10 text-muted-foreground'
                />

                <div role='alert' className='space-y-2'>
                    <h2 className='text-lg font-semibold'>
                        Authentication unavailable
                    </h2>

                    <p className='text-sm text-muted-foreground'>
                        Something went wrong while loading authentication.
                        Please try again.
                    </p>
                </div>

                <Button
                    type='button'
                    onClick={reset}
                    className='w-full'
                >
                    Try again
                </Button>
            </div>
        </div>
    )
}