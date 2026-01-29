'use client'

import Sidebar from '@/components/dashboard-components/Sidebar'
import { ImageSettingsProvider } from '@/context/ImageSettingsProvider'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import ReactQueryProvider from '@/providers/QueryProvider'

export default function Dashboardlayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <ReactQueryProvider>
                <Toaster
                    position='top-center'
                    toastOptions={{
                        duration: 4000,
                    }}
                    richColors
                    closeButton
                />
                <ImageSettingsProvider>
                    <div className='flex min-h-screen bg-background'>
                        {/**Side Bar component */}
                        <aside className='fixed inset-y-0 left-0 w-72 border-r border-border bg-card'>
                            <Sidebar />
                        </aside>
                        <main className='flex-1 ml-72 py-6 px-8'>
                            {children}
                        </main>
                    </div>
                </ImageSettingsProvider>
            </ReactQueryProvider>
        </ClerkProvider>
    )
}