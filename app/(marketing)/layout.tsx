import NavbarMarketing from '@/components/pages-components/MarketingNavbar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Gorilla AI — A personal AI workspace',
    description: 'A focused personal workspace for AI conversations, technical questions, and picking up where you left off.',
}

export default function MarketingLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <div className='font-sans'>
            <NavbarMarketing />
            <main id='main-content' tabIndex={-1}>
                {children}
            </main>
        </div>
    )
}
