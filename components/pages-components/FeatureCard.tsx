interface FeatureCardProps {
  icon: React.ElementType
  title: string
  description: string
  accent?: boolean
}

export default function FeatureCard({ icon: Icon, title, description, accent }: FeatureCardProps) {
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
      <h3 className='text-base font-semibold text-foreground mb-2'>{title}</h3>
      <p className='text-sm text-muted-foreground leading-relaxed'>{description}</p>
    </div>
  )
}
