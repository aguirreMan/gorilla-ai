'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
    const { isSignedIn, user, isLoaded } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.replace('/sign-in')
        }
    }, [isLoaded, isSignedIn, router])

    if (!isLoaded) return <div>Loading ...</div>

    if (!isSignedIn) return null


    return (
        <>
            <div className='pt-6'>
                <h1>Gorilla AI</h1>
                <h1 className='text-2xl font-semibold p-4 m-2'>Welcome {user?.firstName}</h1>
            </div>
        </>
    )
}