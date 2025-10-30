'use client'

import { useState, useEffect } from 'react'

export default function Banner() {
    const [banner, setBanner] = useState(false)

    function closeBanner() {
        setBanner(false)
        sessionStorage.setItem('banner', 'shown')
    }

    // This is checking if user dismisssed closed banner component
    useEffect(() => {
        const bannerSeen = sessionStorage.getItem('banner')
        if (bannerSeen === 'shown') return

        const sessionStorageTimer = setTimeout(() => {
            setBanner(true)
        }, 1000)
        return () => clearTimeout(sessionStorageTimer)
    }, [])

    //Allowing users to close with escape keyword
    useEffect(() => {
        function closeWithEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                closeBanner()
            }
        }
        window.addEventListener('keydown', closeWithEscape)
        return () => window.removeEventListener('keydown', closeWithEscape)
    }, [])

    if (!banner) return null

    return (
        <div className='fixed inset-0 bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-black p-6 rounded-xl shadow-lg text-center relative'>
                <button
                    onClick={closeBanner}
                    className='absolute top-2 right-3 text-gray-500
                     hover:text-gray-800 text-xl cursor-pointer'>
                    X
                </button>
                <h1 className='text-2xl font-semibold text-cyan-600 mb-2'>
                    More AI Models Coming Soon!
                </h1>
                <p className='text-gray-600'>Stay tuned for the latest updates!</p>
            </div>
        </div>
    )
}