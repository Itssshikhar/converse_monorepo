"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analyzeAudioController_1 = require("../src/controllers/analyzeAudioController");
const router = (0, express_1.Router)();
// Route to handle the audio analysis POST request
router.post('/analyze-audio', analyzeAudioController_1.analyzeAudio);
exports.default = router;
