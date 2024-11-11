"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeAudio = void 0;
const redisClient_1 = __importDefault(require("../services/redisClient"));
const analyzeAudio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { audioId, analysisData } = req.body;
    // Cache the result in Redis
    yield redisClient_1.default.set(`audio:${audioId}`, JSON.stringify(analysisData), { ex: 3600 }); // Cache for 1 hour
    res.json({ message: 'Audio analysis completed and cached', data: analysisData });
});
exports.analyzeAudio = analyzeAudio;
