import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
    try {
        // Select some columns or all columns
        const { data, error } = await supabase
            .from('generations')
            .select('id, user_id, image_url, created_at, model, size, credits_used, metadata')
            .limit(1)

        if (error) {
            return NextResponse.json({ success: false, error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true, data })
    } catch (err) {
        return NextResponse.json({ success: false, error: 'Unexpected error' }, { status: 500 })
    }
}