import { Redis } from '@upstash/redis';

export function connectToRedis() {
    const redis = new Redis({
        url: process.env.UPSTASH_REDIS_URL,
        token: process.env.UPSTASH_REDIS_TOKEN,
    });
    return redis;
}