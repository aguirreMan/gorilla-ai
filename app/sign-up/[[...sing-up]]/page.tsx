import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
    return (
        <div className='min-h-10 flex items-center justify-center
        bg-linear-to-br from-green-600 to-purple-700'>
            <SignUp />
        </div>
    )
}