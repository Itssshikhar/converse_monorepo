import { createClient } from 'redis';

const redisClient = createClient({
    url: 'redis://localhost:6379',
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Connect to Redis
async function connectRedis() {
    if (!redisClient.isOpen) await redisClient.connect();
}

// Set cache data with an expiration time
async function setCache(key: string, value: string, expiration = 600) {
    await redisClient.set(key, value, { EX: expiration });
}

// Retrieve data from Redis cache
async function getCache(key: string): Promise<string | null> {
    return await redisClient.get(key);
}

export { redisClient, connectRedis, setCache, getCache };
