"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const analyze_audio_1 = __importDefault(require("../api/analyze-audio"));
const redisClient_1 = __importDefault(require("./services/redisClient"));
require("dotenv/config");
//console.log('Redis URL:', process.env.UPSTASH_REDIS_REST_URL);
//console.log('Redis Token:', process.env.UPSTASH_REDIS_REST_TOKEN);
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// Connect to Redis
redisClient_1.default;
// Middleware
app.use(express_1.default.json());
// Mount Routes
app.use('/api', analyze_audio_1.default);
app.get('/', (req, res) => {
    res.send('Backend is running!');
});
app.listen(port, () => {
    console.log(`Backend running on port ${port}`);
});
