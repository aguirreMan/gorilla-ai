import { useEffect, useRef, useId } from 'react'
import mermaid from 'mermaid'
import { toast } from 'sonner'


mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
})


export default function MermaidBlock({ chart }: { chart: string }) {
  const mermaidRef = useRef<HTMLDivElement>(null)
  //const mermaidFailureRef = useRef(false)

  //const mermaidId = useId()

  useEffect(() => {
    async function renderDiagram() {
      if (!mermaidRef.current) return
      const validMermaid = await mermaid.parse(chart, { suppressErrors: true })

      if (!validMermaid) return

      try {
        mermaidRef.current.textContent = chart

        await mermaid.run({
          nodes: [mermaidRef.current],
        })
        console.log('Mermaid response', mermaidRef.current)
      } catch (error) {
        //mermaidFailureRef.current = true
        toast.error('Mermaid failed to render')
        console.error('Mermaid render failed:', error)
      }
    }

    renderDiagram()
  }, [chart])

  return (
    <div ref={mermaidRef} />
  )
}
