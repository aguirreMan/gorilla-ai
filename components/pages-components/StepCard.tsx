interface StepCardProps {
  number: string
  title: string
  description: string
  last?: boolean
}

export default function StepCard({ number, title, description, last }: StepCardProps) {
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
