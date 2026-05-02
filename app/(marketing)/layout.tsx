import NavbarMarketing from '@/components/pages-components/MarketingNavbar'

export default function MarketingLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <>
            <NavbarMarketing />
            <main>
                {children}
            </main>
        </>
    )
}
