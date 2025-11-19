'use client'
import { useUser, useClerk } from '@clerk/nextjs'

export default function Sidebar() {
    const { user } = useUser()
    const { signOut } = useClerk()

    async function signOutPage() {
        await signOut({ redirectUrl: '/' })
    }

    return (
        <aside className='pt-8 bg-blue-500 w-[20%] h-screen fixed flex justify-center items-start'>
            <div className='bg-amber-300 w-[75%] flex flex-col rounded-lg overflow-hidden'>
                <h2 className='text-2xl font-semibold pt-4 m-2 text-center top-8 mt-0'>{user?.firstName}</h2>
                <button className='bg-green-500 h-12 cursor-pointer'>Invite Members</button>
            </div>
            <div className='mt-24'>
                <button className='cursor-pointer bg-green-500' onClick={signOutPage}>Sign OUt</button>
            </div>
        </aside>
    )
}