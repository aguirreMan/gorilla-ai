'use client'
import { useUser } from '@clerk/nextjs'

export default function Inputprompt() {
    const { user } = useUser()
    return (
        <>
            <div className='flex flex-col justify-center items-center mt-0 gap-2'>
                <h1 className='text-lg text-black font-bold mb-4'>Hi {user?.firstName} what do you want to create today?</h1>
            </div>
            <div className='flex justify-center items-center mt-0 px-4 w-full max-w-3xl mx-auto relative'>
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
        </>
    )
}
