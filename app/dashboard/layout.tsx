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
                    <div className='flex min-h-screen bg-linear-to-b from-[#07120D] via-[#0F3B22] to-black'>
                        {/* This is for the sidebar component to take 20%*/}
                        <aside className='w-[20%] fixed h-screen'>
                            <Sidebar />
                        </aside>
                        <main className='flex-1 ml-[20%] pt-16'>
                            {children}
                        </main>
                    </div>
                </ImageSettingsProvider>
            </ReactQueryProvider>
        </ClerkProvider>
    )
}