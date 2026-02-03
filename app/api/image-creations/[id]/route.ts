import { auth } from '@clerk/nextjs/server'
import { NextResponse, NextRequest } from 'next/server'
import { supabaseServer } from '@/lib/supabase/supabaseServer'

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { userId } = await auth()
    if (!userId) {
        return NextResponse.json(
            { error: 'unauthorized user' },
            { status: 401 }
        )
    }
    const resolvePromiseParams = await params
    const id = resolvePromiseParams.id

    //Fetch image record
    const { data: image, error: fetchError } = await supabaseServer
        .from('generations')
        .select('image_url, user_id, image_path')
        .eq('id', id)
        .single()

    if (fetchError || !image) {
        return NextResponse.json(
            { error: 'Image not found' },
            { status: 404 }
        )
    }
    //Check if user owns the image
    if (image.user_id !== userId) {
        return NextResponse.json(
            { error: 'You are forbiden to delete this image you do not own it' },
            { status: 403 }
        )
    }
    // Delete from supabase storage
    if (image.image_path) {
        const { error: storageError } = await supabaseServer.storage
            .from('generated-images') // This is what its called in supabase storage
            .remove([image.image_path])

        if (storageError) {
            console.error('Storage delete error:', storageError)
        }
    }
    // delete from database 
    const { error: databaseError } = await supabaseServer
        .from('generations')
        .delete()
        .eq('id', id)

    if (databaseError) {
        return NextResponse.json(
            { error: 'Failed to delete image' },
            { status: 500 }
        )
    }
    //Success response 
    return NextResponse.json({ message: 'Image deleted successfully' }, { status: 200 })
}