//These are for types that interact with Supabase 

export interface SupabaseGenerationsData {
    id: string,
    user_id: string
    prompt: string
    image_url: string
    model: string
    size: string
    credits_used: number
    created_at: string
    metaData?: unknown   /// This is for later use 
}

export interface SaveImagesProps {
    userId: string
    userEmail: string
    prompt: string
    imageUrl: string
    model: string
    size: string
    creditsUsed: number
}

export interface UserCredits {
    creditsRemaining: number
    creditsReset: Date
}