'use client'
import Sidebar from './Sidebar'

export default function Dashboardlayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex min-h-screen'>
            {/* This is for the sidebar component to take 20%*/}
            <aside className='w-[20%] fixed h-screen'>
                <Sidebar />
            </aside>
            <main className='flex-1 ml-[20%] pt-16'>
                {children}
            </main>
        </div>
    )
}