'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

type PaymentType = 'yearly' | 'monthly'

export default function PricingPage() {

  const [subscriptionType, setSubscriptionType] = useState<PaymentType>('yearly')

  function toggleSubscriptionPlans(checked: boolean) {
    setSubscriptionType(checked ? 'yearly' : 'monthly')
  }

  const plans = [
    {
      name: 'Free',
      monthlyPlan: '$0',
      yearlyPlan: '$0',
      price: '$0',
      featured: false,
      features: [
        '5 AI-generated visual aids per week',
        'Core subject explanations',
        'Basic knowledge check quizzes',
      ]
    },
    {
      name: 'Pro',
      monthlyPlan: '$9',
      yearlyPlan: '$85',
      featured: true,
      features: [
        'Unlimited AI visual generation',
        'Advanced Socratic learning mode',
        'Access to premier AI models',
        'Personalized learning style profiles',
        'Deep concept breakdowns',
      ]
    },
    {
      name: 'Unlimited',
      monthlyPlan: '$25',
      yearlyPlan: '$200',
      featured: false,
      features: [
        'Everything in Pro',
        'Priority support',
        'Custom integrations',
        'Team collaboration',
        'Advanced analytics'
      ]
    }
  ]

  return (
    <>
      {/**Header and toggle */}
      <div className='min-h-screen bg-jungle text-foreground relative'>
        <div className='relative flex flex-col items-center pt-32 px-4'>
          <h1 className='text-4xl sm:text-4xl font-bold tracking-tight
          text-center leading-tight'>
            Unlock the power of Gorilla AI
          </h1>
          <p className='text-lg sm:text-lg text-muted-foreground mt-6 text-center max-w-2xl'>
            Choose the plan that fits your workflow. No hidden fees. Cancel anytime.
          </p>
          {/*Toggle switch*/}
          <div className='flex items-center gap-3 mt-8'>
            <span className={subscriptionType === 'monthly' ? 'font-semibold' : 'text-white/60'}>
              Monthly
            </span>
            <Switch
              id='subscription-switch'
              checked={subscriptionType === 'yearly'}
              onCheckedChange={toggleSubscriptionPlans}
              className='
              border border-border cursor-pointer
              data-[state=checked]:bg-primary
              data-[state=unchecked]:bg-card
              [&>span]:bg-foreground'
            />
            <span className={subscriptionType === 'yearly' ? 'font-semibold' : 'text-white/60'}>
              Yearly
            </span>
        </div>
      </div>

      {/*Pricing Cards */}
      <div className='w-full pt-12 px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-7xl justify-items-center'>
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={cn(
              'relative rounded-2xl p-6 transition-all',
              'bg-card text-card-foreground',
              'border shadow-lg hover:shadow-2xl hover:-translate-y-1',
              plan.featured && 'ring-2 ring-primary scale-[1.02]'
              )}>
                {plan.featured && (
                  <span className='absolute top-4 right-4 text-xs px-2
                    py-1 rounded-full bg-primary text-primary-foreground'>
                  Most Popular
                  </span>
                )}
                <CardHeader>
                  <CardTitle className='text-center text-4xl font-bold'>
                    {plan.name}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className='text-3xl font-bold tracking-tight flex items-baseline gap-1 justify-center'>
                    {subscriptionType === 'yearly' ? plan.yearlyPlan : plan.monthlyPlan}

                    {plan.monthlyPlan !== 'Custom' && (
                      <span className='text-base text-muted-foreground'>
                        /{subscriptionType === 'yearly' ? 'year' : 'month'}
                      </span>
                    )}
                  </div>

                  <ul className='mt-6 space-y-3'>
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className='flex items-center gap-2 text-sm'>
                        <Check className='w-6 h-6 text-primary ' />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {plan.name !== 'Free' && (
                    <Button className='w-full mt-6 py-3 cursor-pointer '>
                      Pay Now
                    </Button>
                  )}
                </CardContent>
              </Card>
          ))}
          </div>
        </div>
      </div>
  </>
  )
}
