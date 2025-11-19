'use client'

import Dashboardlayout from '@/components/dashboard-components/Dashboardlayout'
import Dashboardnav from '@/components/dashboard-components/Dashboardnav'
import Inputprompt from '@/components/dashboard-components/Inputprompt'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
    const { isSignedIn, isLoaded } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.replace('/sign-in')
        }
    }, [isLoaded, isSignedIn, router])

    if (!isLoaded) return <div>Loading ...</div>

    if (!isSignedIn) return null


    return (
        <Dashboardlayout>
            <Dashboardnav />
            <div className='pt-16'>
                <Inputprompt />
            </div>
        </Dashboardlayout>
    )
}