'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { IoMdClose } from 'react-icons/io'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Button } from '../ui/button'

export default function NavbarMarketing() {
    const [openNav, setOpenNav] = useState<boolean>(false)

    function toggleNav() {
        setOpenNav(!openNav)
    }

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 768px)')

        function resizeNavigationOnBreakPoint() {
            if (mediaQuery.matches) {
                setOpenNav(false)
            }
        }
        mediaQuery.addEventListener('change', resizeNavigationOnBreakPoint)

        return () => {
            mediaQuery.removeEventListener('change', resizeNavigationOnBreakPoint)
        }
    }, [])

    return (
        <>
            <nav className='fixed w-full pt-8 top-0 left-0 flex items-center justify-between bg-transparent z-50 px-6'>
                <Link href='/'>
                    <h2 className='text-3xl cursor-pointer font-semibold tracking-tight text-foreground'>
                        Gorilla Ai
                    </h2>
                </Link>

                {/* Desktop Navigation */}
                <ul className='hidden md:flex absolute left-1/2 -translate-x-1/2 flex-row gap-6 items-center'>
                    <Link href='/featured'>
                        <li className='cursor-pointer text-md text-muted-foreground hover:text-foreground transition'>Featured</li>
                    </Link>
                    <Link href='/pricing'>
                        <li className='cursor-pointer text-md text-muted-foreground hover:text-foreground transition'>Pricing</li>
                    </Link>
                    <Link href='/about'>
                        <li className='cursor-pointer text-md text-muted-foreground hover:text-foreground transition'>About</li>
                    </Link>
                    <Link href='/contact'>
                        <li className='cursor-pointer text-md text-muted-foreground hover:text-foreground transition'>Contact</li>
                    </Link>


                    <Button asChild size='sm'>
                        <Link href='/sign-in'>Launch App</Link>
                    </Button>
                </ul>

                {/* Hamburger Button */}
                <div className='md:hidden cursor-pointer z-50' onClick={toggleNav}>
                    {openNav ? <IoMdClose size={28} className='text-muted-foreground' /> : <GiHamburgerMenu size={28} className='text-muted-foreground' />}
                </div>
            </nav>

            {/* Mobile Menu */}
            {openNav && (
                <div
                    className='fixed inset-0 w-full h-full bg-background/95 backdrop-blur-sm z-40 flex justify-center items-center'
                    onClick={toggleNav}
                >
                    <nav
                        className='flex flex-col gap-6 items-center'
                        onClick={(event) => event.stopPropagation()}
                    >
                        <Link href='/featured' onClick={toggleNav}>
                            <span className='cursor-pointer text-muted-foreground hover:text-foreground font-medium transition text-xl'>
                                Featured
                            </span>
                        </Link>
                        <Link href='/pricing' onClick={toggleNav}>
                            <span className='cursor-pointer text-muted-foreground hover:text-foreground font-medium transition text-xl'>
                                Pricing
                            </span>
                        </Link>
                        <Link href='/research' onClick={toggleNav}>
                            <span className='cursor-pointer text-muted-foreground hover:text-foreground font-medium transition text-xl'>
                                Research
                            </span>
                        </Link>
                        <Link href='/contact' onClick={toggleNav}>
                            <span className='cursor-pointer text-muted-foreground hover:text-foreground font-medium transition text-xl'>
                                Contact
                            </span>
                        </Link>

                        <div className='flex flex-col gap-3 mt-4 w-full max-w-xs'>
                            <Button asChild variant='outline' size='lg' className='w-full'>
                                <Link href='/sign-in' onClick={toggleNav}>Sign In</Link>
                            </Button>

                            <Button asChild size='lg' className='w-full'>
                                <Link href='/sign-up' onClick={toggleNav}>Get Started</Link>
                            </Button>
                        </div>
                    </nav>
                </div>
            )}
        </>
    )
}
