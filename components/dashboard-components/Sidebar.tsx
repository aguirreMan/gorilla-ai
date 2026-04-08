'use client'

import dynamic from 'next/dynamic'
import { ImagesettingsSelectProps } from '@/components/dashboard-components/ImagesettingsSelect'

const ImagesettingsSelect = dynamic(
  () => import('@/components/dashboard-components/ImagesettingsSelect'),
  { ssr: false }
) as <T extends string>(props: ImagesettingsSelectProps<T>) => React.ReactElement

import { useImagesContext } from '@/context/ImageSettingsProvider'
import { useUser, useClerk } from '@clerk/nextjs'
import { Folder } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function Sidebar() {
  const { chooseImageSize, chooseModel,
    availableModels, model, availableSizes, imageSize, } = useImagesContext()

  const { user } = useUser()
  const { signOut } = useClerk()

  async function signOutPage() {
    await signOut({ redirectUrl: '/' })
  }

  return (
    <aside className='h-full flex flex-col bg-card px-4 py-6'>
      {/* User */}
      <div className='mb-6 rounded-lg border border-border bg-muted px-3 py-2 text-sm text-muted-foreground'>
        Hi, <span className='text-foreground'>{user?.firstName}</span>
      </div>
      {/**Navigation section */}
        <Link href='/gallery'
          className='mb-6 flex items-center gap-2 rounded-md px-3 py-2 text-sm
          text-muted-foreground hover:bg-muted hover:text-foreground transition'>
          <Folder className='h-4 w-4' />
              Gallery
        </Link>
      {/**Control panel */}
        <div className='flex flex-1 flex-col gap-6 overflow-y-auto'>
          <ImagesettingsSelect
            label='Model'
            currentValue={model}
            options={availableModels}
            onChange={chooseModel}
          />

          <ImagesettingsSelect
            label='Image size'
            currentValue={imageSize}
            options={availableSizes}
            onChange={chooseImageSize}
          />
        </div>
      {/**Sign out component  */}
      <Button
        onClick={() => signOutPage()}
        className='mt-6 rounded-md border border-border px-3 py-2
        text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer'
      >
        Signout
      </Button>
    </aside>
  )
}
