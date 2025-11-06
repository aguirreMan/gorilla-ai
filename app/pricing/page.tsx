'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

import { useState } from 'react'

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
            name: 'Standard',
            monthlyPlan: '$6',
            yearlyPlan: '$65',
            price: '$6',
            featured: false,
            features: [
                '5 generations per week',
                'Basic image generation',
                'Standard quality images'
            ]
        },
        {
            name: 'Pro',
            monthlyPlan: '$8',
            yearlyPlan: '$80',
            featured: true,
            features: [
                'Unlimited generations',
                'Edit images',
                'Access to premier model',
                'Different model options',
                'High quality images'
            ]
        },
        {
            name: 'Enterprise',
            monthlyPlan: 'Custom',
            yearlyPlan: 'Custom',
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
            <div className='flex flex-col items-center pt-24'>
                <h1 className='mb-4'>Choose your plan</h1>
                <span>{subscriptionType}</span>
                <Switch
                    id='subscription-switch'
                    checked={subscriptionType === 'yearly'}
                    onCheckedChange={toggleSubscriptionPlans}
                    className='flex items-center cursor-pointer' />
                <Label htmlFor='subscription-switch' />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl pt-4 px-4'>
                {plans.map((plan, index) => (
                    <Card
                        key={index}
                        className={plan.featured ? 'scale-105 border-2 border-green-500 shadow-xl relative' : ''}
                    >
                        <CardHeader>
                            <CardTitle className='text-center text-4xl'>{plan.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='text-3xl font-bold'>
                                {subscriptionType === 'yearly' ? plan.yearlyPlan : plan.monthlyPlan}
                            </div>
                            <ul className='mt-4 space-y-2'>
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className='text-sm'>{feature}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}