'use client'
import { useUser } from '@clerk/nextjs'

export default function Dashboardnav() {
    const { user } = useUser()

    return (
        <nav className='h-18 flex justify-end items-center px-6
        fixed top-0 left-[20%] right-0 z-10 shadow-md border-0 outline-0'>
            <div className='flex gap-4'>
                <button className='bg-blue-800 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer px-6'>
                    Upgrade
                </button>
                <button className='bg-blue-400 py-2 px-4 rounded cursor-pointer'>
                    {user?.firstName ? user?.firstName.charAt(0).toUpperCase() : ''}
                </button>
            </div>
        </nav>
    )
}