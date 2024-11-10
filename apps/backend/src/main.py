# backend/src/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import redis
from redis import asyncio as aioredis
import os
from datetime import datetime
import json

app = FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For demo purposes. Restrict this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Redis configuration using Upstash
class RedisConfig:
    def __init__(self):
        redis_url = os.getenv('UPSTASH_REDIS_URL')
        if not redis_url:
            raise Exception("Upstash Redis URL not found")
        
        self.redis_client = aioredis.from_url(
            redis_url,
            decode_responses=True,
            ssl_cert_reqs=None  # Required for Upstash
        )
    
    async def get_client(self):
        return self.redis_client

# Initialize Redis
redis_config = RedisConfig()

@app.on_event("startup")
async def startup_event():
    app.state.redis = await redis_config.get_client()

@app.on_event("shutdown")
async def shutdown_event():
    if hasattr(app.state, "redis"):
        await app.state.redis.close()

@app.get("/api/health")
async def health_check():
    try:
        await app.state.redis.ping()
        redis_status = "connected"
    except Exception as e:
        redis_status = f"error: {str(e)}"
    
    return {
        "status": "healthy",
        "redis_status": redis_status,
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/whisper/{audio_id}")
async def get_whisper_results(audio_id: str):
    cache_key = f"whisper:{audio_id}"
    
    # Try to get from cache
    cached_result = await app.state.redis.get(cache_key)
    if cached_result:
        return {
            "data": json.loads(cached_result),
            "source": "cache"
        }
    
    # Your whisper processing logic here
    result = {
        "transcription": f"Sample transcription for {audio_id}",
        "timestamp": datetime.now().isoformat()
    }
    
    # Cache the result
    await app.state.redis.setex(
        cache_key,
        3600,  # 1 hour TTL
        json.dumps(result)
    )
    
    return {
        "data": result,
        "source": "processed"
    }