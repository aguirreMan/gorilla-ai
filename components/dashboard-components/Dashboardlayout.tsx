'use client'
import Sidebar from './Sidebar'
import { ImageSettingsProvider } from '@/app/context/ImageSettingsProvider'

export default function Dashboardlayout({ children }: { children: React.ReactNode }) {
    return (
        <ImageSettingsProvider>
            <div className='flex min-h-screen bg-linear-to-b from-[#0f1f14] via-[#0b1310] to-black'>
                {/* This is for the sidebar component to take 20%*/}
                <aside className='w-[20%] fixed h-screen'>
                    <Sidebar />
                </aside>
                <main className='flex-1 ml-[20%] pt-16'>
                    {children}
                </main>
            </div>
        </ImageSettingsProvider>
    )
}