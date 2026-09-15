'use client'

import { useState, ReactNode } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Sidebar from '@/components/dashboard-components/Sidebar'

export default function DashboardChatLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className='flex h-[calc(100dvh-4rem)]'>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className='flex flex-col flex-1 min-h-0'>
        <div className='flex items-center gap-3 px-3 py-3 border-b md:hidden'>
          <Button
            className='mr-2'
            variant='ghost'
            size='icon'
            onClick={() => setSidebarOpen(true)}
            aria-label='Open sidebar'>
            <Menu size={20} />
          </Button>
        </div>
        {children}
      </div>
    </div>
  )
}