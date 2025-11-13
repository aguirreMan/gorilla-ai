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
            <aside className='pt-6 bg-blue-500 max-w-[20%] h-screen fixed'>
                <h1 className='ml-4 text-green-700 text-3xl top-0 left-0'>Gorilla AI</h1>
                <h2 className='text-2xl font-semibold pt-4 m-2 break-normal'>Welcome {user?.firstName}</h2>
            </aside>
        </>
    )
}