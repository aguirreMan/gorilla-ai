import { redis } from '@/lib/upstash/upstash-test'

export async function GET() {
    await redis.set('ping', 'pong', { ex: 10 })
    const value = await redis.get('ping')

    return Response.json({ value })
}