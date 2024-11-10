// frontend/src/components/Demo.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-backend-url.vercel.app';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export default function Demo() {
  const [status, setStatus] = useState({
    system: 'unknown',
    redis: 'unknown',
  });
  const [demoResult, setDemoResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkHealth = async () => {
    try {
      const response = await api.get('/api/health');
      setStatus({
        system: response.data.status,
        redis: response.data.redis_status,
      });
    } catch (err) {
      setError('Failed to check system health');
    }
  };

  const runDemo = async () => {
    setLoading(true);
    setError(null);
    try {
      // Generate a random ID for demo purposes
      const demoId = Math.random().toString(36).substring(7);
      
      // First request - should be processed
      const result1 = await api.get(`/api/whisper/${demoId}`);
      
      // Second request - should be cached
      const result2 = await api.get(`/api/whisper/${demoId}`);
      
      setDemoResult({
        firstCall: result1.data,
        secondCall: result2.data,
        improvement: result2.data.source === 'cache' ? 'Cache hit!' : 'Cache miss',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">System Status</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold">Backend Status</h3>
            <p className={status.system === 'healthy' ? 'text-green-600' : 'text-red-600'}>
              {status.system}
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold">Redis Status</h3>
            <p className={status.redis === 'connected' ? 'text-green-600' : 'text-red-600'}>
              {status.redis}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={runDemo}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Running Demo...' : 'Run Cache Demo'}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {demoResult && (
          <div className="space-y-4">
            <h3 className="font-semibold">Demo Results:</h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p><strong>First Call:</strong> {demoResult.firstCall.source}</p>
              <p><strong>Second Call:</strong> {demoResult.secondCall.source}</p>
              <p className="text-green-600 font-semibold mt-2">{demoResult.improvement}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}