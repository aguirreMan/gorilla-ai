'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'
import { Check } from 'lucide-react'
import Image from 'next/image'
import Gorilla from '@/public/assets/gorilla-night.jpg'

type PaymentType = 'yearly' | 'monthly'

export default function PricingPage() {
    //Create state for a month or yearly toggle
    const [subscriptionType, setSubscriptionType] = useState<PaymentType>('yearly')

    function toggleSubscriptionPlans(checked: boolean) {
        setSubscriptionType(checked ? 'yearly' : 'monthly')
    }

    //Create plans for my pricing cards to dynamically generate cards from shad cn
    const plans = [
        {
            name: 'Free',
            monthlyPlan: '$0',
            yearlyPlan: '$0',
            price: '$0',
            featured: false,
            features: [
                '5 generations per week',
                'Basic image generation',
                'Standard quality images'
            ]
        },
        {
            name: 'Pro',
            monthlyPlan: '$9',
            yearlyPlan: '$85',
            featured: true,
            features: [
                'Unlimited generations',
                'Edit images',
                'Access to our premier models',
                'Different model options',
                'High quality images'
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
        <div className='min-h-screen text-white relative'>
            {/**This is for the background */}
            <div className='absolute inset-0 -z-10 overflow-hidden'>
                <Image
                    src={Gorilla}
                    alt='super-gorilla'
                    fill
                    priority
                    sizes='100vw'
                    className='object-cover object-center'
                />
                <div className='absolute inset-0 bg-black/60'></div>
            </div>

            {/**Header and toggle */}
            <div className='relative z-2 flex flex-col items-center pt-24 px-4'>
                <h1 className='text-4xl sm:text-4xl font-bold tracking-tight 
                    text-center leading-tight'>
                    Unlock the power of Gorilla AI
                </h1>
                <p className='text-lg sm:text-lg text-white/80 mt-4 text-center max-w-2xl'>
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
                        className='cursor-pointer'
                    />
                    <span className={subscriptionType === 'yearly' ? 'font-semibold' : 'text-white/60'}>
                        Yearly
                    </span>
                </div>
            </div>

            {/*Pricing Cards */}

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto pt-16 px-4 '>
                {plans.map((plan, index) => (
                    <Card
                        key={index}
                        className={`relative rounded-2xl p-6 bg-white/10 backdrop-blur-md 
                            border border-white/20 shadow-lg transition-all
                            hover:shadow-2xl hover:-translate-y-1 
                             ${plan.featured ? 'ring-2 ring-primary bg-primary/5 scale-[1.01]' : ''}`}
                    >
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
                                        <Check className='w-4 h-4 text-white ' />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className='w-full mt-6 py-3 
                                rounded-xl bg-white/20 text-white 
                                font-semibold hover:bg-white/30 transition cursor-pointer'>
                                Pay Now
                            </button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}