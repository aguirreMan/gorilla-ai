import { redis } from '@/lib/upstash/rateLimit'

export async function GET() {
    await redis.set('ping', 'pong', { ex: 10 })
    const value = await redis.get('ping')

    return Response.json({ value })
}