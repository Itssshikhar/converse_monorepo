import { Router } from 'express';
import { analyzeAudio } from '../controllers/analyzeAudioController';

const router = Router();

// Route to handle the audio analysis POST request
router.post('/analyze-audio', analyzeAudio);

export default router;
