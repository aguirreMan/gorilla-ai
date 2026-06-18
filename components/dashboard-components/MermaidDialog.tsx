'use client'

import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { MermaidProps } from './MermaidBlock'

import MermaidBlock from './MermaidBlock'

export default function MermaidDialog({ chart }: MermaidProps) {
  const [openMermaid, setOpenMermaid] = useState(false)
  return (
    <>
  <div
    role='button'
    tabIndex={0}
    aria-label='Open diagram fullscreen'
    onClick={() => setOpenMermaid(true)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setOpenMermaid(true)
      }
    }}
    className='w-full h-auto cursor-zoom-in'
    >
      <MermaidBlock chart={chart} />
    </div>
   <Dialog open={openMermaid} onOpenChange={setOpenMermaid}>
     <DialogContent className='max-w-[95vw] sm:max-w-[95vw] w-full h-[90vh] pt-12 overflow-auto'>
          {openMermaid && <MermaidBlock chart={chart} />}
     </DialogContent>
      </Dialog>
    </>
  )
}
