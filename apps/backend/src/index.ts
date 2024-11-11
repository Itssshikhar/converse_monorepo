import express from 'express';
import analyzeAudioRoute from '../api/analyze-audio';
import connectRedis from './services/redisClient';
import 'dotenv/config';

//console.log('Redis URL:', process.env.UPSTASH_REDIS_REST_URL);
//console.log('Redis Token:', process.env.UPSTASH_REDIS_REST_TOKEN);

const app = express();
const port = process.env.PORT || 3001;

// Connect to Redis
connectRedis;

// Middleware
app.use(express.json());

// Mount Routes
app.use('/api', analyzeAudioRoute);

app.get('/', (req, res) => {
    res.send('Backend is running!');
});  

app.listen(port, () => {
    console.log(`Backend running on port ${port}`);
});
