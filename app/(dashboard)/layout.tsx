'use client'

import Dashboardnav from '@/components/dashboard-components/Dashboardnav'
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
          <div className='flex flex-col min-h-screen bg-background'>
            <Dashboardnav />
            <main className='flex-1 w-full max-w-5xl mx-auto px-6 py-8'>
              {children}
            </main>
          </div>
      </ReactQueryProvider>
    </ClerkProvider>
  )
}
