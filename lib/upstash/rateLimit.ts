import { Ratelimit } from '@upstash/ratelimit'
import { redis } from '@/lib/upstash/redis'


export const imageGenerationRateLimiting = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 h'),
    analytics: true
})
