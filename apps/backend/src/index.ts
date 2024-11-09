import express from 'express';
import analyzeAudioRoute from './routes/analyzeAudioRoute';
import { connectRedis } from './services/redisClient';

const app = express();
const port = process.env.PORT || 3001;

// Connect to Redis
connectRedis();

// Middleware
app.use(express.json());

// Mount Routes
app.use('/api', analyzeAudioRoute);

app.listen(port, () => {
    console.log(`Backend running on port ${port}`);
});
