import { SignUp } from '@clerk/nextjs'
import { shadcn } from '@clerk/themes'

export default function Page() {
  return (
    <SignUp
      appearance={{ theme: shadcn }}
      signInUrl='/sign-in'
    />
  )
}
