import Link from 'next/link'
import { ArrowRight, Code2, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import WorkspacePreview from '@/components/pages-components/WorkspacePreview'

export default function Home() {
  return (
    <div className='bg-background'>
      <section aria-labelledby='hero-heading' className='mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-24'>
        <div className='max-w-3xl'>
          <p className='mb-5 flex items-center gap-2 font-mono text-xs tracking-wide text-muted-foreground'>
            <span className='size-1.5 rounded-full bg-primary' aria-hidden='true' /> A personal AI workspace
          </p>
          <h1 id='hero-heading' className='text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl'>
            A place to think.<br /><span className='text-muted-foreground'>A thread to return to.</span>
          </h1>
          <p className='mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8'>Keep your AI conversations together. Work through technical questions, explore ideas in code, and pick up where you left off.</p>
          <div className='mt-8 flex flex-wrap items-center gap-3'>
            <Button asChild size='lg' className='h-11 bg-foreground text-background hover:bg-foreground/90'><Link href='/dashboard'>Open workspace <ArrowRight aria-hidden='true' /></Link></Button>
            <Button asChild variant='ghost' size='lg' className='h-11 text-muted-foreground'><Link href='#workspace'>Explore the workspace <span aria-hidden='true'>↓</span></Link></Button>
          </div>
        </div>
        <div id='workspace' className='scroll-mt-8 pt-12 sm:pt-16'>
          <div className='mb-3 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-muted-foreground'>
            <span className='flex items-center gap-2'><Code2 className='size-3.5' aria-hidden='true' /> Inside Gorilla AI</span>
            <span>Workspace preview · sample conversation</span>
          </div>
          <WorkspacePreview />
          <p className='mt-4 text-center text-xs leading-5 text-muted-foreground'>Your conversations, a focused chat, and room to keep going.</p>
        </div>
      </section>
      <section aria-labelledby='details-heading' className='border-y border-border bg-surface/50'>
        <div className='mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-[1fr_2fr] md:gap-16'>
          <div>
            <p className='font-mono text-xs text-muted-foreground'>Less friction. More focus.</p>
            <h2 id='details-heading' className='mt-3 text-2xl font-semibold tracking-tight sm:text-3xl'>Keep the context.<br />Continue the work.</h2>
          </div>
          <div className='grid gap-8 sm:grid-cols-2'>
            <div><MessageSquare className='mb-4 size-5 text-muted-foreground' aria-hidden='true' /><h3 className='text-base font-medium'>Conversations that stay with you</h3><p className='mt-3 text-sm leading-6 text-muted-foreground'>Start a fresh thread or return to a saved conversation. Keep related questions and follow-ups in one place.</p></div>
            <div><Code2 className='mb-4 size-5 text-muted-foreground' aria-hidden='true' /><h3 className='text-base font-medium'>Room for technical detail</h3><p className='mt-3 text-sm leading-6 text-muted-foreground'>Read formatted replies, code blocks, and diagrams in the conversation. Responses stream as they arrive, with a control to stop generation.</p></div>
          </div>
        </div>
      </section>
      <footer className='mx-auto flex max-w-6xl flex-col justify-between gap-6 px-4 py-10 sm:flex-row sm:items-center sm:px-6'>
        <div><p className='text-sm font-medium'>A personal project, built as I learn.</p><p className='mt-2 max-w-lg text-sm leading-6 text-muted-foreground'>Gorilla AI is my own space for working with AI, built on OpenRouter and improved along the way.</p></div>
        <Link href='/dashboard' className='inline-flex min-h-11 shrink-0 items-center gap-2 rounded-sm text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground'>Open workspace <ArrowRight className='size-4' aria-hidden='true' /></Link>
      </footer>
    </div>
  )
}
