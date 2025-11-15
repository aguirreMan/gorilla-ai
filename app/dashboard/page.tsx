'use client'

import { useUser, useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
    const { isSignedIn, user, isLoaded } = useUser()
    const { signOut } = useClerk()
    const router = useRouter()

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.replace('/sign-in')
        }
    }, [isLoaded, isSignedIn, router])

    if (!isLoaded) return <div>Loading ...</div>

    if (!isSignedIn) return null

    async function signOutPage() {
        await signOut({ redirectUrl: '/' })
    }



    return (
        <>
            <aside className='pt-8 bg-blue-500 max-w-[20%] w-[20%] h-screen fixed flex justify-center items-start'>
                <div className='bg-amber-300 w-[75%] flex flex-col rounded-lg overflow-hidden'>
                    <h2 className='text-2xl font-semibold pt-4 m-2 text-center top-8 mt-0'>{user?.firstName}</h2>
                    <button className='bg-green-500 h-12 cursor-pointer'>Invite Members</button>
                </div>
                <div className='mt-24'>
                    <button className='cursor-pointer bg-red-500' onClick={signOutPage}>Sign OUt</button>
                </div>
            </aside>
            <main className='bg-gray-400 h-screen ml-[20%] pt-8'>
                <nav className='flex justify-end items-center px-6 '>
                    <div className='flex gap-4'>
                        <button className='bg-blue-800 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer px-6'>
                            Upgrade
                        </button>
                        <button className='bg-blue-400 py-2 px-4 rounded cursor-pointer'>
                            {user?.firstName ? user?.firstName.charAt(0).toUpperCase() : ''}
                        </button>
                    </div>
                </nav>
                <div className='flex flex-col justify-center items-center mt-24 gap-2'>
                    <h1 className='text-lg text-white font-bold'>What do you want to Create Today?</h1>
                    <p>Generate with a simple prompt</p>
                </div>
                <div className='flex justify-center items-center mt-8 px-4 w-full max-w-3xl mx-auto relative'>
                    <textarea className='w-full border-2 border-blue-300 pt-4 pl-4
                    text-lg focus:outline-none 
                    focus:ring-4 focus:ring-blue-300 shadow-md resize-none 
                    transition duration-200 ease-in-out'
                        rows={6}
                        placeholder='Type your AI prompt here...'
                    />
                    <button className='absolute bottom-4 right-6 
                    bg-green-500 cursor-pointer pr-4 px-5 py-2 rounded-lg 
                    shadow-lg'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                        </svg>
                    </button>
                </div>
            </main>
        </>
    )
}