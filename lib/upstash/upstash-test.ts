import { Redis } from '@upstash/redis'

export const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

async function testRedis() {
    try {
        await redis.set('key', 'hello', { ex: 10 })
        const data = await redis.get('key')
        console.log(data)
    } catch (error) {
        console.error(error)
    }
}

testRedis()
