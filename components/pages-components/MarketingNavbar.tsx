//This Marketing Navbar contains zero clerk components 

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { IoMdClose } from 'react-icons/io'
import { GiHamburgerMenu } from 'react-icons/gi'

export default function NavbarMarketing() {
    const [openNav, setOpenNav] = useState<boolean>(false)

    function toggleNav() {
        setOpenNav(!openNav)
    }

    return (
        <>
            <nav className='fixed w-full pt-8 top-0 left-0 flex items-center justify-between bg-transparent z-50 px-6'>
                <Link href='/'>
                    <h2 className='text-green-700 text-3xl cursor-pointer font-bold hover:text-green-600 transition'>
                        Gorilla Ai
                    </h2>
                </Link>

                {/* Desktop Navigation */}
                <ul className='hidden md:flex absolute left-1/2 -translate-x-1/2 flex-row gap-6 items-center'>
                    <Link href='/featured'>
                        <li className='cursor-pointer px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:text-green-700 font-medium transition'>Featured</li>
                    </Link>
                    <Link href='/pricing'>
                        <li className='cursor-pointer px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:text-green-700 font-medium transition'>Pricing</li>
                    </Link>
                    <Link href='/research'>
                        <li className='cursor-pointer px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:text-green-700 font-medium transition'>Research</li>
                    </Link>
                    <Link href='/contact'>
                        <li className='cursor-pointer px-4 py-2 rounded-lg text-gray-700 hover:text-green-700 bg-gray-100 font-medium transition'>Contact</li>
                    </Link>


                    <Link href='/sign-in'>
                        <li className='px-4 py-2 rounded-lg cursor-pointer bg-gray-100 text-gray-700 hover:text-green-700 font-semibold transition'>
                            Launch App
                        </li>
                    </Link>
                </ul>

                {/* Hamburger Button */}
                <div className='md:hidden cursor-pointer z-50' onClick={toggleNav}>
                    {openNav ? <IoMdClose size={28} className='text-gray-700' /> : <GiHamburgerMenu size={28} className='text-gray-700' />}
                </div>
            </nav>

            {/* Mobile Menu */}
            {openNav && (
                <div
                    className='fixed inset-0 w-full h-full bg-white z-40 flex justify-center items-center'
                    onClick={toggleNav}
                >
                    <nav
                        className='flex flex-col gap-6 items-center'
                        onClick={(event) => event.stopPropagation()}
                    >
                        <Link href='/featured' onClick={toggleNav}>
                            <span className='cursor-pointer text-gray-700 hover:text-green-700 font-medium transition text-xl'>
                                Featured
                            </span>
                        </Link>
                        <Link href='/pricing' onClick={toggleNav}>
                            <span className='cursor-pointer text-gray-700 hover:text-green-700 font-medium transition text-xl'>
                                Pricing
                            </span>
                        </Link>
                        <Link href='/research' onClick={toggleNav}>
                            <span className='cursor-pointer text-gray-700 hover:text-green-700 font-medium transition text-xl'>
                                Research
                            </span>
                        </Link>
                        <Link href='/contact' onClick={toggleNav}>
                            <span className='cursor-pointer text-gray-700 hover:text-green-700 font-medium transition text-xl'>
                                Contact
                            </span>
                        </Link>

                        <Link href='/sign-in' onClick={toggleNav}>
                            <span className='cursor-pointer text-gray-700 hover:text-green-700 font-medium transition text-xl'>
                                Sign In
                            </span>
                        </Link>
                    </nav>
                </div>
            )}
        </>
    )
}