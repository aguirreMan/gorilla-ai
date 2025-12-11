import { supabaseServer } from './supabaseServer'

interface SaveImagesProps {
    userId: string
    prompt: string
    imageUrl: string
    model: string
    size: string
    creditsUsed: number
}

export async function saveImages({
    userId,
    prompt,
    imageUrl,
    model,
    size,
    creditsUsed }: SaveImagesProps) {

    const imageResponse = await fetch(imageUrl)

    if (!imageResponse.ok) {
        throw new Error(`Failed to download image from external URL: ${imageResponse.status} ${imageResponse.statusText}`);
    }

    const imageBlob = await imageResponse.blob()
    const buffer = Buffer.from(await imageBlob.arrayBuffer())

    const fileName = `${userId}/${Date.now()}.png`


    const { error: uploadError } = await supabaseServer.storage
        .from('generated-images')
        .upload(fileName, buffer, {
            contentType: 'image/png',
            upsert: false
        })

    if (uploadError) {
        console.error('Upload error:', uploadError)
        throw uploadError
    }

    const { data: { publicUrl } } = supabaseServer.storage
        .from('generated-images')
        .getPublicUrl(fileName)


    const { data, error } = await supabaseServer
        .from('generations')
        .insert({
            user_id: userId,
            prompt: prompt,
            image_url: publicUrl,
            model: model,
            size: size,
            credits_used: creditsUsed
        })
        .select()
        .single()

    if (error) {
        console.error('Database error:', error)
        throw error
    }

    return {
        url: publicUrl,
        id: data.id
    }
}