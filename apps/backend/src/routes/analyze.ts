import { Request, Response } from 'express';
import connectToRedis from '../services/redisClient';

export default async function handler(req: Request, res: Response) {
    if (req.method === 'POST') {
        const { data } = req.body;
        const redis = await connectToRedis;
        await redis.set("key", data);
        res.status(200).json({ message: 'Data processed and stored in Redis' });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
