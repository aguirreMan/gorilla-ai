import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import ReactQueryProvider from '@/providers/QueryProvider'


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Gorilla AI - Your Creative AI Agent',
  description: 'Generate stunning AI images with Gorilla',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
          <ReactQueryProvider>
            <Toaster
              position='top-center'
              toastOptions={{
                duration: 4000,
              }}
              richColors
              closeButton
            />
            {children}
          </ReactQueryProvider>
        </body>
      </html>

    </ClerkProvider>
  )
}