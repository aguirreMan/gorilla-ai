'use client'

import Dashboardnav from '@/components/dashboard-components/Dashboardnav'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'

export default function Dashboardlayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
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
          <main className='flex-1 pt-16'>
            {children}
          </main>
      </div>
    </ClerkProvider>
  )
}
