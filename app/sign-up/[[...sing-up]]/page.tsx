import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
    return (
        <div className='min-h-screen flex items-center justify-center
        bg-linear-to-br from-blue-600 to-purple-700'>
            <SignUp />
        </div>
    )
}