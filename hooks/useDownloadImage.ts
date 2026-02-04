import { useState } from 'react'

export function useDownloadImage() {
    const [isDownLoading, setDownLoading] = useState(false)

    async function downLoadImage(imageUrl: string, prompt?: string) {
        setDownLoading(true)

        try {
            const response = await fetch(imageUrl)
            if (!response.ok) throw new Error('Failed to download your image')
            const createdBlob = await response.blob()
            // create a blob url
            const blobUrl = URL.createObjectURL(createdBlob)
            //Create a link 

            const link = document.createElement('a')
            link.href = blobUrl
            link.download = generateFileName(prompt)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(blobUrl)
        } catch (err) {
            console.error('download error', err)
            throw err
        } finally {
            setDownLoading(false)
        }
    }
    return { downLoadImage, isDownLoading }
}

function generateFileName(prompt?: string): string {
    const brand = 'gorilla-ai'
    const extension = 'png'

    if (prompt) {
        const slug = slugString(prompt)

        if (slug.length > 0) {
            return `${brand}-${slug}.${extension}`
        }
    }

    return `${brand}-image.${extension}`
}

function slugString(input: string, maxLength = 30): string {
    return input
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, maxLength)
}
