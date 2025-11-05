'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function DashboardPage() {
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function generateImage() {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch('/api/openai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: 'A majestic lion' }),
            })

            if (!response.ok) {
                throw new Error('Failed to fetch image')
            }

            const data = await response.json()
            setImageUrl(data.data?.[0]?.url || null)
        } catch (err) {
            setError((err as Error).message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-6">
            <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>

            <button
                onClick={generateImage}
                disabled={loading}
                className='px-4 py-2 bg-blue-600 text-white rounded'

            >
                {loading ? 'Generating...' : 'Generate Image'}
            </button>

            {error && <p className="text-red-600 mt-2">{error}</p>}

            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt='Generated image'
                    width={512}
                    height={512}
                    className='mt-6 max-w-full rounded shadow' />
            )}
        </div>
    )
}
