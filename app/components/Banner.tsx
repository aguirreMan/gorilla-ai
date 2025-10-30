'use client'

import { useState, useEffect } from 'react'

export default function Banner() {
    const [banner, setBanner] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setBanner(true)
        }, 2000)

        const closeTimer = setTimeout(() => {
            setBanner(false)
        }, 6000)

        return () => {
            clearTimeout(timer)
            clearTimeout(closeTimer)
        }
    }, [])

    if (!banner) return null

    return (
        <div className='fixed inset-0 bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-black p-6 rounded-xl shadow-lg text-center relative'>
                <button
                    onClick={() => setBanner(false)}
                    className='absolute top-2 right-3 text-gray-500
                     hover:text-gray-800 text-xl'>
                    &times;
                </button>
                <h1 className='text-2xl font-semibold text-cyan-600 mb-2'>
                    More AI Models Coming Soon!
                </h1>
                <p className='text-gray-600'>Stay tuned for the latest updates!</p>
            </div>
        </div>
    )
}