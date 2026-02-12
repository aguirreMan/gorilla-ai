'use client'
import { createPortal } from 'react-dom'
import { ReactNode, useEffect } from 'react'

interface PortalOverlayProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export default function PortalOverlay({ isOpen, children, onClose }: PortalOverlayProps){


  useEffect(() => {
    function handleEscKeyboardPress(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscKeyboardPress)

    return () => {
      document.removeEventListener('keydown', handleEscKeyboardPress)
    }
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if(!isOpen) return null

  return createPortal(
    <div onClick={onClose}
      className='fixed inset-0 z-100 bg-jungle backdrop-blur-sm flex items-center justify-center'>
      <div onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  )
}
