import NavbarMarketing from '@/components/pages-components/MarketingNavbar'
import Footer from '@/components/pages-components/Footer'

export default function MarketingLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <>
            <NavbarMarketing />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}