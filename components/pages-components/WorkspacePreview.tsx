import { ArrowUp, MessageSquare, SquarePen } from 'lucide-react'

const conversations = ['Planning a small API', 'Understanding React effects', 'Notes on database indexes']

export default function WorkspacePreview() {
  return (
    <figure aria-label='Static Gorilla AI workspace preview with saved conversations and a sample technical exchange' className='overflow-hidden rounded-xl border border-muted-foreground/30 bg-background shadow-2xl shadow-black/30'>
      <div className='flex h-12 items-center border-b border-border bg-surface px-4 sm:px-5'>
        <span className='text-sm font-semibold tracking-tight'>Gorilla AI</span>
      </div>
      <div className='flex'>
        <div className='hidden w-56 shrink-0 flex-col border-r border-border bg-surface md:flex lg:w-64'>
          <div className='flex items-center gap-3 border-b border-border px-3 py-4'>
            <span className='flex size-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground'>U</span>
            <span className='text-sm text-muted-foreground'>Personal workspace</span>
          </div>
          <div className='flex items-center gap-2 border-b border-border px-4 py-4 text-sm text-muted-foreground'><SquarePen className='size-4' aria-hidden='true' /> New Chat</div>
          <div className='flex-1 space-y-1 p-2'>
            {conversations.map((title, index) => (
              <div key={title} className={`flex items-center gap-2 rounded-md border-l-2 px-2 py-2.5 text-sm ${index === 0 ? 'border-primary bg-accent text-foreground' : 'border-transparent text-muted-foreground'}`}>
                <MessageSquare className='size-3.5 shrink-0' aria-hidden='true' /><span className='truncate'>{title}</span>
              </div>
            ))}
          </div>
          <div className='border-t border-border p-3'><span className='block rounded-md border border-border px-3 py-2 text-sm text-muted-foreground'>Sign out</span></div>
        </div>
        <div className='min-w-0 flex-1'>
          <div className='space-y-6 px-4 py-8 sm:px-8 sm:py-10 lg:px-12'>
            <div className='flex flex-row-reverse items-start gap-2 sm:gap-3'>
              <span className='flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold'>U</span>
              <p className='max-w-[85%] rounded-2xl rounded-tr-sm border border-border bg-accent px-4 py-3 text-sm leading-6'>How should I structure a small API for my reading list?</p>
            </div>
            <div className='flex items-start gap-2 sm:gap-3'>
              <span className='flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold'>G</span>
              <div className='min-w-0 max-w-[90%] rounded-2xl rounded-tl-sm border border-border bg-card px-4 py-4 text-sm leading-6 sm:max-w-[85%]'>
                <p>Start with a single books resource. Keep the routes small and add more structure when you need it.</p>
                <pre className='mt-4 overflow-x-auto rounded-lg border border-border bg-background p-3 font-mono text-xs leading-6 text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground' tabIndex={0} aria-label='Example API routes'><code>{'GET    /books       List your books\nPOST   /books       Add a book\nPATCH  /books/:id   Update progress\nDELETE /books/:id   Remove a book'}</code></pre>
                <p className='mt-4 text-muted-foreground'>A title, author, and reading status are enough for the first version.</p>
              </div>
            </div>
          </div>
          <div className='border-t border-border px-4 py-4 sm:px-8'>
            <div className='rounded-xl border border-muted-foreground/30 bg-background px-4 pt-4 pb-3 shadow-lg shadow-black/20'>
              <p className='text-sm text-muted-foreground'>Ask anything, explore an idea, or work through a problem.</p>
              <div className='mt-6 flex items-center justify-between gap-2'>
                <span className='text-[11px] text-muted-foreground sm:text-xs'>Shift + Enter for new line</span>
                <span className='flex size-7 items-center justify-center rounded-lg bg-muted text-muted-foreground'><ArrowUp className='size-4' aria-hidden='true' /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  )
}
