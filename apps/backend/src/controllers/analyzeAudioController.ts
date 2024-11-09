/*
import { Request } from 'express';
import axios from 'axios';

export const analyzeAudio = async (data: any) => {
    try {
        // Assuming we send data to the Python microservice
        const response = await axios.post('http://localhost:5000/analyze', data);
        return response.data;
    } catch (error) {
        console.error('Error in audio analysis:', error);
        throw new Error('Audio analysis failed');
    }
};
*/

import { Request, Response } from 'express';
import axios from 'axios';
import { setCache, getCache } from '../services/redisClient';

export const analyzeAudio = async (req: Request, res: Response) => {
    const { audioData } = req.body;

    const cacheKey = `audio:${audioData.id}`;
    const cachedData = await getCache(cacheKey);

    if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
    }

    try {
        const response = await axios.post('http://localhost:5000/analyze', { audioData });
        const result = response.data;

        // Cache the result with a unique key
        await setCache(cacheKey, JSON.stringify(result));

        res.status(200).json(result);
    } catch (error) {
        console.error('Error analyzing audio:', error);
        res.status(500).json({ error: 'Failed to analyze audio' });
    }
};
