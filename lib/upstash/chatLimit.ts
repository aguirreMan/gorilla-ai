import { Ratelimit } from '@upstash/ratelimit'
import { redis } from '@/lib/upstash/redis'


export const chatGenerationRateLimiting = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(40, '1 h'),
    analytics: true
})
