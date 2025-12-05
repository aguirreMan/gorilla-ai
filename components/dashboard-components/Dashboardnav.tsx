'use client'

export default function Dashboardnav() {

    return (
        <nav className='h-18 flex justify-end items-center px-6
        fixed top-0 left-[20%] right-0 z-10 shadow-md border-0 outline-0'>
            <div className='flex gap-4'>
                <button className='bg-blue-800 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer px-6'>
                    Upgrade
                </button>

            </div>
        </nav>
    )
}