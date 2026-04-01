'use client'

import { useUser } from '@clerk/nextjs'
import { useState } from 'react'
import Link from 'next/link'
import Dashboardnav from '@/components/dashboard-components/Dashboardnav'
import UniversalChat from '@/components/dashboard-components/UniversalChat'
import { Badge } from '@/components/ui/badge'


export default function DashboardPage() {
  const { isSignedIn, isLoaded } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState('')

  async function submitToOpenRouter(message: string) {
    setIsLoading(true)

    try {
      const res = await fetch('/api/openrouter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openrouter/auto',
          messages: [{ role: 'user', content: message }],
          stream: false
        }),
      })
      console.log('OpenRouter status:', res.status)

      const data = await res.json()

      console.log(data)

      const reply =
        data?.choices?.[0]?.message?.content || 'No response'

      setResponse(reply)
    } catch (err) {
      console.error(err)
      setResponse('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isLoaded) return <div>Loading...</div>
  if (!isSignedIn) return null

  return (
    <>
    <Dashboardnav />
      <div className='pt-16'>
        <UniversalChat onSend={submitToOpenRouter} isLoading={isLoading} />
        <div className='mt-8 flex flex-row flex-wrap items-center justify-center gap-4'>
          <Link href='/images'>
            <Badge className='px-5 py-2 bg-[#1D2416] text-[#8CAF6A] border border-[#2E3B20] hover:bg-[#232C1A] hover:border-[#4a6030] cursor-pointer' variant='outline'>
              <span>Images</span>
            </Badge>
          </Link>
          <Badge className='px-5 py-2 bg-[#162232] text-[#7EB8D4] border border-[#1E3A5C] shadow-[0_0_10px_rgba(77,123,147,0.2)] hover:bg-[#1A2B40] hover:shadow-[0_0_14px_rgba(77,123,147,0.35)] cursor-pointer' variant='outline'>
            <span>Research</span>
          </Badge>
          <Badge className='px-5 py-2 bg-[#1D2416] text-[#8CAF6A] border border-[#2E3B20] hover:bg-[#232C1A] hover:border-[#4a6030] cursor-pointer' variant='outline'>
            <span>Code</span>
          </Badge>
          <Badge className='px-5 py-2 bg-[#162232] text-[#7EB8D4] border border-[#1E3A5C] shadow-[0_0_10px_rgba(77,123,147,0.2)] hover:bg-[#1A2B40] hover:shadow-[0_0_14px_rgba(77,123,147,0.35)] cursor-pointer' variant='outline'>
            <span>Analyze</span>
          </Badge>
        </div>
      </div>
    </>
  )
}
