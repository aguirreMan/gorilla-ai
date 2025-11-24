'use client'

import Footer from './Footer'
import { usePathname } from 'next/navigation'

export default function ConditionalFooter() {
    const pathname = usePathname()
    const hideFooter = pathname.startsWith('/sign-in') ||
        pathname.startsWith('/sign-up') || pathname.startsWith('/dashboard')

    if (hideFooter) return null
    return <Footer />
}