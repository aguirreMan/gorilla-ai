import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'
import { toast } from 'sonner'


mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
})


export default function MermaidBlock({ chart }: { chart: string }) {
  const mermaidRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mermaidTimer = setTimeout(async () => {
      const validMermaid = await mermaid.parse(chart, { suppressErrors: true })

      if (!validMermaid || !mermaidRef.current) return

      try {
        mermaidRef.current.removeAttribute('data-processed')
        mermaidRef.current.textContent = chart

        await mermaid.run({ nodes: [mermaidRef.current]})
      } catch (error) {
        toast.error('Mermaid failed to render')
        console.error('Mermaid render failed:', error)
      }

    }, 1000)
    return () => clearTimeout(mermaidTimer)
  }, [chart])

  return (
    <div className='w-full h-auto' ref={mermaidRef} />
  )
}
