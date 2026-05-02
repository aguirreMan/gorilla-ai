'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link  from 'next/link'

const freeFeatures = [
  'Limited daily AI messages',
  'Basic code explanations',
  'Standard response speed',
  'Limited access to premier AI models',
]

export default function PricingPage() {
  return (
    <div className='min-h-screen bg-jungle text-foreground relative'>
      <div className='relative flex flex-col items-center pt-32 px-4'>
        <h1 className='text-4xl sm:text-4xl font-bold tracking-tight text-center leading-tight'>
          Simple pricing for developers
        </h1>
        <p className='text-lg text-muted-foreground mt-6 text-center max-w-2xl'>
          Get started for free. No hidden fees. No credit card required.
        </p>

        <div className='mt-12 w-full max-w-sm'>
          <Card className='rounded-2xl p-6 border shadow-lg bg-card text-card-foreground'>
            <CardHeader>
              <CardTitle className='text-center text-4xl font-bold'>Free</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold tracking-tight flex items-baseline gap-1 justify-center'>
                $0
                <span className='text-base text-muted-foreground'>/month</span>
              </div>
              <ul className='mt-6 space-y-3'>
                {freeFeatures.map((feature, idx) => (
                  <li key={idx} className='flex items-center gap-2 text-sm'>
                    <Check className='w-5 h-5 text-primary shrink-0' />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button asChild className='w-full mt-8'>
                <Link href='/sign-up'>Get started for free</Link>
              </Button>
            </CardContent>
          </Card>

          <p className='mt-6 text-center text-sm text-muted-foreground'>
            <span className='font-semibold text-foreground'>Pro plan coming soon</span>
            <br />
            unlock unlimited usage and advanced AI.
          </p>
        </div>
      </div>
    </div>
  )
}
