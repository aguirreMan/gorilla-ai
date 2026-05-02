'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Bug, Code as Code2, Lightbulb, ArrowRight, CircleCheck as CheckCircle2, ChevronRight, BookOpen } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

function FeatureCard({
  icon: Icon,
  title,
  description,
  accent,
}: {
  icon: React.ElementType
  title: string
  description: string
  accent?: boolean
}) {
  return (
    <div className={`group relative rounded-xl p-6 border transition-all duration-300 hover:-translate-y-1 ${
      accent
        ? 'border-primary/40 bg-primary/5 hover:border-primary/60 hover:bg-primary/10'
        : 'border-border bg-card hover:border-border/80 hover:bg-card/80'
    }`}>
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-4 ${
        accent ? 'bg-primary/20' : 'bg-secondary/60'
      }`}>
        <Icon className={`w-5 h-5 ${accent ? 'text-primary' : 'text-muted-foreground'}`} />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}

function StepCard({
  number,
  title,
  description,
  last,
}: {
  number: string
  title: string
  description: string
  last?: boolean
}) {
  return (
    <div className='flex gap-5'>
      <div className='shrink-0 flex flex-col items-center'>
        <div className='w-9 h-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary text-sm font-semibold'>
          {number}
        </div>
        {!last && <div className='flex-1 w-px bg-border mt-3' />}
      </div>
      <div className={`${last ? 'pb-0' : 'pb-10'}`}>
        <h3 className='text-base font-semibold text-foreground mb-1'>{title}</h3>
        <p className='text-sm text-muted-foreground leading-relaxed'>{description}</p>
      </div>
    </div>
  )
}

const CHAT_STEPS = [
  { role: 'user' as const, text: 'Why does user.profile throw undefined here?' },
  { role: 'assistant' as const, section: 'root-cause', text: 'session loads asynchronously — user exists on first render but profile is still null.' },
  { role: 'assistant' as const, section: 'fix', text: 'Use optional chaining: user?.profile?.avatar ?? defaultAvatar' },
  { role: 'assistant' as const, section: 'learn', text: 'Optional chaining short-circuits to undefined instead of throwing, so your UI can render a fallback without crashing.' },
]

function ChatDemo() {
  const [step, setStep] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started || step >= CHAT_STEPS.length) return
    const delay = CHAT_STEPS[step].role === 'user' ? 400 : 700
    const t = setTimeout(() => setStep(s => s + 1), delay)
    return () => clearTimeout(t)
  }, [started, step])

  const visible = CHAT_STEPS.slice(0, step)
  const assistantSteps = visible.filter(s => s.role === 'assistant')

  return (
    <div ref={ref} className="rounded-xl border border-border bg-card overflow-hidden shadow-2xl">
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border bg-card/80">
        <div className="w-2 h-2 rounded-full bg-primary/70" />
        <span className="text-sm font-medium text-foreground">Gorilla AI</span>
        <span className="ml-auto text-xs text-muted-foreground/60">auth/session.ts · line 42</span>
      </div>

      <div className="p-5 space-y-4 min-h-[300px]">
        <div className="rounded-lg bg-muted/50 border border-border px-4 py-3">
          <p className="text-xs text-muted-foreground mb-2 font-medium">auth/session.ts</p>
          <code className="text-sm text-foreground font-mono">
            const avatar = <span className="text-red-400/80">user.profile</span>.avatar
          </code>
        </div>

        {visible.some(s => s.role === 'user') && (
          <div className="flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary/15 border border-primary/20 px-4 py-2.5">
              <p className="text-sm text-foreground">{CHAT_STEPS[0].text}</p>
            </div>
          </div>
        )}

        {assistantSteps.length > 0 && (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {assistantSteps.some(s => s.section === 'root-cause') && (
              <div className="rounded-xl border border-border bg-muted/30 px-4 py-3 space-y-1">
                <p className="text-xs font-semibold text-primary uppercase tracking-wide">Root cause</p>
                <p className="text-sm text-foreground leading-relaxed">{CHAT_STEPS[1].text}</p>
              </div>
            )}
            {assistantSteps.some(s => s.section === 'fix') && (
              <div className="rounded-xl border border-green-500/20 bg-green-500/5 px-4 py-3 space-y-1">
                <p className="text-xs font-semibold text-green-500/80 uppercase tracking-wide">Fix</p>
                <code className="text-sm text-foreground font-mono">{CHAT_STEPS[2].text}</code>
              </div>
            )}
            {assistantSteps.some(s => s.section === 'learn') && (
              <div className="rounded-xl border border-border bg-card/40 px-4 py-3 space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Why it works</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{CHAT_STEPS[3].text}</p>
              </div>
            )}
          </div>
        )}

        {started && step < CHAT_STEPS.length && step > 0 && (
          <div className="flex gap-1 px-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce [animation-delay:300ms]" />
          </div>
        )}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="bg-background min-h-screen">

      {/* Hero */}
      <section className='relative overflow-hidden pt-40 pb-28 px-6 text-center bg-grid'>
        <div className='pointer-events-none absolute inset-0 bg-linear-gradient(to-b, from-background via-background to-muted/20)' aria-hidden />
        <div className='pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/6 blur-[140px]' aria-hidden />

        <div className='relative z-10 max-w-4xl mx-auto'>
          <h1 className='text-5xl md:text-7xl font-bold tracking-tight leading-[1.08] text-foreground'>
            Debug faster.{' '}
            <span className='text-gradient-primary'>Learn as you go.</span>
          </h1>

          <p className='mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
            Gorilla AI explains your code in plain language — paste a function, drop in an error, and get a clear answer in seconds.
          </p>

          <div className='mt-10 flex flex-col sm:flex-row items-center justify-center gap-4'>
            <Button size='lg' asChild className='glow-sm px-8 text-base'>
              <Link href='/sign-up'>
                Get Started Free
                <ArrowRight className='ml-2 w-4 h-4' />
              </Link>
            </Button>
            <Button size='lg' variant='ghost' asChild className='text-base text-muted-foreground hover:text-foreground'>
              <Link href='/pricing'>
                View Pricing
                <ChevronRight className='ml-1 w-4 h-4' />
              </Link>
            </Button>
          </div>

          <p className='mt-5 text-xs text-muted-foreground/50'>
            No credit card required &nbsp;&middot;&nbsp; Free tier available
          </p>
        </div>
      </section>

      {/* Features */}
      <section className='py-28 px-6'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-16'>
            <p className='text-xs uppercase tracking-widest text-primary mb-3'>Features</p>
            <h2 className='text-3xl md:text-5xl font-bold text-foreground'>
              Everything you need to move faster
            </h2>
            <p className='mt-4 text-muted-foreground max-w-xl mx-auto'>
              Purpose-built for developers who want to understand their code — not just copy-paste solutions.
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-5'>
            <FeatureCard
              icon={Code2}
              title="Understand any code"
              description="Drop in a function, file, or snippet and get a plain-English breakdown of what it does and how it works — no docs required."
            />
            <FeatureCard
              icon={Bug}
              title="Debug errors faster"
              description="Paste an error or stack trace and get the root cause, what it means, and exactly what to change — not just a generic fix."
              accent
            />
            <FeatureCard
              icon={Lightbulb}
              title="Learn the why"
              description="Every answer explains the concept behind the fix so the same problem never slows you down twice."
            />
            <FeatureCard
              icon={BookOpen}
              title="Ask follow-up questions"
              description="Go deeper on any topic in the same conversation. Explore patterns, ask edge cases, and build real understanding as you work."
            />
          </div>
        </div>
      </section>

      {/* Demo */}
      <section className="py-24 px-6 border-y border-border bg-card/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary mb-3">See it in action</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              From confusion to clarity in seconds
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Paste your code or error, ask your question in plain English, and get an answer that actually makes sense — root cause, fix, and the reasoning behind it.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                'Works with any language or framework',
                'Explains the why, not just the fix',
                'Ask follow-ups in the same conversation',
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className='w-4 h-4 text-primary shrink-0' />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button asChild className="glow-sm">
                <Link href="/sign-up">
                  Try it free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          <ChatDemo />
        </div>
      </section>

      {/* How it works */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-primary mb-3">How it works</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Three steps to clarity
            </h2>
          </div>

          <div>
            <StepCard
              number="1"
              title="Paste your code or ask a question"
              description="Drop in a snippet, function, or error message — or just describe what you're trying to understand in plain English."
            />
            <StepCard
              number="2"
              title="Get a clear explanation"
              description="Gorilla breaks down what's happening — root cause, what it means, and exactly what to change. No vague answers."
            />
            <StepCard
              number="3"
              title="Understand the fix"
              description="See why the issue happens, not just what to change. Every answer teaches you something so the same bug doesn't bite you twice."
            />
            <StepCard
              number="4"
              title="Keep learning as you go"
              description="Ask follow-up questions in the same conversation. Dig into patterns, explore edge cases, and build real understanding without breaking your flow."
              last
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 px-6 text-center relative overflow-hidden border-t border-border">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/6 blur-[100px]" aria-hidden />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Ready to understand your code?
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            No setup. No credit card. Just paste your code and go.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="glow-primary px-10 text-base">
              <Link href="/sign-up">
                Start for free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base">
              <Link href="/pricing">See pricing</Link>
            </Button>
          </div>
          <p className="mt-5 text-xs text-muted-foreground/50">
            Free plan &nbsp;&middot;&nbsp; No credit card &nbsp;&middot;&nbsp; Cancel anytime
          </p>
        </div>
      </section>

    </div>
  )
}
