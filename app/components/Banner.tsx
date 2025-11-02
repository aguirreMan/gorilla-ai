'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

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

                    {/**dark overlay */}

                    <div className='absolute inset-0 bg-black/40' />

                    {/* Content */}
                    <div className='relative z-10 flex flex-col justify-center
                    h-full text-center p-8 items-center'>
                        <button
                            onClick={closeBanner}
                            className='absolute top-4 right-4 text-white 
                            hover:text-gray-300 text-xl cursor-pointer z-20
                            bg-black/30 rounded-full w-8 h-8 flex justify-center
                            hover:bg-black/50 transition'>
                            X
                        </button>
                        <h1 className='text-4xl font-bold text-green-700 mb-4'>
                            Gorilla Mode coming soon!
                        </h1>
                        <p className='text-xl text-center text-white/80 mb-8'>The next evolution of Ai image generation</p>
                        <Link href='/research' onClick={closeBanner}
                            className='mt-8 px-6 py-2 bg-green-600 text-white rounded-full
                        hover:bg-green-950 transition font-semibold
                        text-lg shadow-xl hover:scale-105 transform'>Learn more</Link>
                    </div>
                </div>
            </div>
        </>
    )
}