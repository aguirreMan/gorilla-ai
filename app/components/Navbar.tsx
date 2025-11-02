import Link from 'next/link'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Navbar() {
    return (
        <nav className='fixed w-full pt-8 top-0 left-0 flex items-center bg-transparent z-50'>
            <Link href='/'>
                <h2 className='text-green-700 text-3xl ml-6 cursor-pointer font-bold hover:text-green-600 transition'>Gorilla Ai</h2>
            </Link>
            <ul className='absolute left-1/2 -translate-x-1/2 flex flex-row gap-6 items-center'>
                <Link href='/features'>
                    <li className='cursor-pointer text-gray-700 hover:text-green-700 font-medium transition'>Features</li>
                </Link>
                <Link href='/pricing'>
                    <li className='cursor-pointer text-gray-700 hover:text-green-700 font-medium transition'>Pricing</li>
                </Link>
                <Link href='/research'>
                    <li className='cursor-pointer text-gray-700 hover:text-green-700 font-medium transition'>Ai research</li>
                </Link>
                <Link href='/contact'>
                    <li className='cursor-pointer text-gray-700 hover:text-green-700 font-medium transition'>Contact</li>
                </Link>

                {/**Clerk components */}
                <SignedOut>
                    <li>
                        <SignInButton>
                            <button className='px-4 py-2 rounded-lg cursor-pointer
                             text-gray-700 hover:text-green-700 font-semibold transition
                             hover:bg-gray-100'>Sign In</button>
                        </SignInButton>
                    </li>
                    <li>
                        <SignUpButton>
                            <button className='bg-green-600 text-white rounded-full font-semibold px-6 py-2 
                            cursor-pointer hover:bg-green-700 transition transform hover:scale-105 shadow-lg'>
                                Start Creating
                            </button>
                        </SignUpButton>
                    </li>
                </SignedOut>
                <SignedIn>
                    <li><Link href='/dashboard'></Link></li>
                    <li><UserButton /></li>
                </SignedIn>
            </ul>
        </nav>
    )
}