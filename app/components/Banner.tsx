'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'



export default function Banner() {
    const [banner, setBanner] = useState(false)
    const bannerRef = useRef<HTMLDivElement>(null)

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


    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (bannerRef.current && !bannerRef.current.contains(event.target as Node)) {
                //Outside Clicks
                closeBanner()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)

    }, [])

    if (!banner) return null

    return (
        <>
            {/**Overlay */}
            <div className='fixed inset-0 bg-black/70 z-40' />

            {/**Banner content */}
            <div className='fixed inset-0 flex items-center justify-center z-50  -translate-y-16 mt-24'>
                <div
                    ref={bannerRef}
                    className='relative w-full max-w-2xl aspect-video overflow-hidden rounded-xl shadow-lg'>
                    {/* Background Image */}
                    <div className='absolute inset-0'>
                        <Image
                            src='/assets/gorilla-flux.jpg'
                            alt='Gorilla Flux'
                            fill
                            className='object-cover'
                            priority
                        />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 text-center p-6">
                        <button
                            onClick={closeBanner}
                            className="absolute top-2 right-3 text-white hover:text-gray-300 text-xl cursor-pointer z-20"
                        >
                            X
                        </button>
                        <h1 className="text-2xl font-semibold text-cyan-400 mb-2 mt-4">
                            Gorilla AI Model 2 coming soon!
                        </h1>
                        <p className="text-gray-200">Stay tuned for the latest updates!</p>
                    </div>
                </div>
            </div>
        </>
    )
}