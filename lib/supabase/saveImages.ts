import { supabaseServer } from './supabaseServer'
import { ensureUserExists } from './ensureUserExists'
import { SaveImagesProps, SupabaseGenerationsData } from '@/types/supabaseTypes'

export async function saveImages({
    userId,
    userEmail,
    prompt,
    imageUrl,
    model,
    size,
    creditsUsed }: SaveImagesProps): Promise<SupabaseGenerationsData & { url: string }> {

    await ensureUserExists(userId, userEmail)

    const imageResponse = await fetch(imageUrl)

    if (!imageResponse.ok) {
        throw new Error(`Failed to download image from external URL: ${imageResponse.status} ${imageResponse.statusText}`)
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
        ...data
    }
}