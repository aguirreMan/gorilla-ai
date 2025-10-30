import Link from 'next/link'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Navbar() {
    return (
        <nav className='fixed w-full pt-4 top-0 left-0 flex items-center bg-blue-400'>
            <Link href='/'>
                <h2 className='text-blue-700 text-3xl ml-6'>Gorilla Ai</h2>
            </Link>
            <ul className='absolute left-1/2 -translate-x-1/2 flex flex-row gap-8'>
                <Link href='/features'>
                    <li className='ml-4 cursor-pointer'>Features</li>
                </Link>
                <Link href='/pricing'>
                    <li className='ml-4 cursor-pointer'>Pricing</li>
                </Link>
                <Link href='/contact'>
                    <li className='ml-4 cursor-pointer'>Contact</li>
                </Link>

                {/**Clerk components */}
                <SignedOut>
                    <li>
                        <SignInButton>
                            <button className='bg-white px-4 py-2 rounded-lg'>Sign In</button>
                        </SignInButton>
                    </li>
                    <li>
                        <SignUpButton>
                            <button className='bg-[#6c47ff] text-white rounded-full font-medium px-5 py-2'>
                                Sign UP
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