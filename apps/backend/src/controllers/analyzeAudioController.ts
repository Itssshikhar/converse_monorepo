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

import redis from '../services/redisClient';

export const analyzeAudio = async (req, res) => {
  const { audioId, analysisData } = req.body;

  // Cache the result in Redis
  await redis.set(`audio:${audioId}`, JSON.stringify(analysisData), { ex: 3600 }); // Cache for 1 hour

  res.json({ message: 'Audio analysis completed and cached', data: analysisData });
};
