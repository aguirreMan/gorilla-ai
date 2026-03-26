'use client'
import Sidebar from '@/components/dashboard-components/Sidebar'
import { ImageSettingsProvider } from '@/context/ImageSettingsProvider'

export default function ImagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <ImageSettingsProvider>
      <div className='flex min-h-screen'>
        <aside className='fixed inset-y-0 left-0 w-64 border-r border-border bg-card'>
          <Sidebar />
        </aside>
        <main className='flex-1 ml-64 pt-16 px-8 py-8'>
          {children}
        </main>
      </div>
    </ImageSettingsProvider>
  )
}
