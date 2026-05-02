'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '../ui/button'

const navLinks = [
  { label: 'Pricing', href: '/pricing' },
]

export default function NavbarMarketing() {
  const [openNav, setOpenNav] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  function toggleNav() {
    setOpenNav(prev => !prev)
  }


  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const handleResize = () => { if (mq.matches) setOpenNav(false) }
    mq.addEventListener('change', handleResize)
    return () => mq.removeEventListener('change', handleResize)
  }, [])

  // Scroll background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (openNav) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [openNav])

  return (
    <>
      <nav className={`fixed w-full top-0 left-0 z-50 px-6 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border py-4'
          : 'bg-transparent pt-8 pb-4'
      }`}>

        {/* Logo */}
        <Link href='/'>
          <span className='text-2xl font-semibold tracking-tight text-accent cursor-pointer'>
            Gorilla AI
          </span>
        </Link>

        {/* Desktop nav */}
        <div className='hidden md:flex items-center gap-6'>
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpenNav(false)}
              className={`text-sm transition-colors ${
                pathname === href
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {label}
            </Link>
          ))}
          <Button asChild variant='ghost' size='sm'>
            <Link href='/sign-in' onClick={() => setOpenNav(false)}>Sign in</Link>
          </Button>
          <Button asChild size='sm'>
            <Link href='/sign-up' onClick={() => setOpenNav(false)}>Get started</Link>
          </Button>
        </div>

        {/* Hamburger */}
        <button
          className='md:hidden z-50 text-muted-foreground hover:text-foreground transition-colors'
          onClick={toggleNav}
          aria-label='Toggle navigation'
        >
          {openNav ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile overlay */}
      {openNav && (
        <div
          className='fixed inset-0 w-full h-full bg-background/95 backdrop-blur-sm z-40 flex flex-col justify-center items-center gap-8'
          onClick={toggleNav}
        >
          <span className='text-xl font-semibold text-foreground'>Gorilla AI</span>

          <nav
            className='flex flex-col gap-6 items-center'
            onClick={e => e.stopPropagation()}
          >
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setOpenNav(false)}
                className={`text-xl font-medium transition-colors ${
                  pathname === href
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {label}
              </Link>
            ))}

            <div className='flex flex-col gap-3 mt-4 w-full max-w-xs'>
              <Button asChild variant='outline' size='lg' className='w-full'>
                <Link href='/sign-in' onClick={() => setOpenNav(false)}>Sign in</Link>
              </Button>
              <Button asChild size='lg' className='w-full'>
                <Link href='/sign-up' onClick={() => setOpenNav(false)}>Get started</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
