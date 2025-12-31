import Navbar from '@/components/pages-components/Navbar'
import Footer from '@/components/pages-components/Footer'

export default function MarketingLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}