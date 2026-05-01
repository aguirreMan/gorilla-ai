import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { toast } from 'sonner'
import { Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Codeblock({ language, code }: { language: string; code: string }) {
  const languageStyles: Record<string, string> = {
    javascript: 'bg-yellow-500/10 text-yellow-400',
    js: 'bg-yellow-500/10 text-yellow-400',
    typescript: 'bg-blue-500/10 text-blue-400',
    ts: 'bg-blue-500/10 text-blue-400',
    python: 'bg-green-500/10 text-green-400',
    json: 'bg-gray-500/10 text-gray-300',
    html: 'bg-orange-500/10 text-orange-400',
    css: 'bg-pink-500/10 text-pink-400',
  }

  const [copied, setCopied] = useState(false)

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error( error instanceof Error ? error.message : 'Failed to copy code')
    }
  }
  return (
      <div className='relative rounded-lg border border-border my-3'>
        <div className='flex items-center justify-between px-4 py-1.5 border-b border-border bg-muted'>
        <Badge shape='sharp' className={cn('text-xs rounded-sm', languageStyles[language] ?? 'text-muted-foreground')}>
          {language}
        </Badge>
        <Button className='hover:bg-accent' variant='ghost' size='icon' title='copy' onClick={copyCode}>
          {copied ? (
            <Check className='h-4 w-4 text-primary' />
           ) : (
             <Copy className='h-4 w-4' />
           )}
        </Button>
        </div>
        <SyntaxHighlighter language={language} style={atomDark} customStyle={{ margin: 0, borderRadius: '0 0 0.5rem 0.5rem' }}>
          {code}
        </SyntaxHighlighter>
      </div>
    )
}
