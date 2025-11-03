'use client'

//This file will conditionally render out the navbar based on the page path
//I dont want to render navigation on sign up or sign in pages

import Navbar from './Navbar'
import { usePathname } from 'next/navigation'

export default function ConditionalNavbar() {
    const pathname = usePathname()
    const hideNavBar = pathname.startsWith('/sign-in') ||
        pathname.startsWith('/sign-up')

    if (hideNavBar) return null
    return <Navbar />
}