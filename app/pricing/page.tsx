'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'
import { Check } from 'lucide-react'

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
            <div className='flex flex-col items-center pt-24 px-4'>
                <h1 className='text-4xl md:text-6xl font-bold tracking-tight text-center'>Simple transparent pricing</h1>
                <p className='text-lg text-muted-foreground mt-4 text-center max-w-2xl'>
                    Choose the plan that fits your workflow. No hidden fees. Cancel anytime.
                </p>
                {/*Toggle switch*/}
                <div className='flex items-center gap-3 mt-8'>
                    <span className={subscriptionType === 'monthly' ? 'font-semibold' : 'text-muted-foreground'}>
                        Monthly
                    </span>
                    <Switch
                        id="subscription-switch"
                        checked={subscriptionType === 'yearly'}
                        onCheckedChange={toggleSubscriptionPlans}
                    />
                    <span className={subscriptionType === 'yearly' ? 'font-semibold' : 'text-muted-foreground'}>
                        Yearly
                    </span>
                </div>
            </div>

            {/*Pricing Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl pt-16 px-4'>
                {plans.map((plan, index) => (
                    <Card
                        key={index}
                        className={`relative rounded-2xl p-6 bg-linear-to from-background to-muted/20
                            border border-border/40 shadow-lg transition-all
                            hover:shadow-2xl hover:-translate-y-1
                             ${plan.featured ? 'ring-2 ring-primary bg-primary/5 scale-[1.02]' : ''}`}
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
                                        <Check className='w-4 h-4 text-primary ' />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}