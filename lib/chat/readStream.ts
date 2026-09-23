import type { StreamingResponse } from '@/types/chatTypes'
interface ReadStreamProps {
    body: ReadableStream<Uint8Array>,
    onContentChange: (content: string) => void
}

export async function readStream({ body, onContentChange }: ReadStreamProps): Promise<void> {
    const reader = body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    try {
        while (true) {
            const { done, value } = await reader.read()
            if (done) break

            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split('\n')
            buffer = lines.pop() ?? ''

            for (const line of lines) {
                if (!line.startsWith('data:')) continue

                const json = line.slice(5).trim()
                if (json === '[DONE]') return
                if (!json) continue

                const parsed: StreamingResponse = JSON.parse(json)
                if (parsed.content) onContentChange(parsed.content)
            }
        }
    } finally {
        reader.releaseLock()
    }
}