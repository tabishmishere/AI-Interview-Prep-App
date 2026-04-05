import { GoogleGenAI } from '@google/genai'; 
try { const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); console.log('Init ok'); } 
catch (e) { console.error('Init failed', e); }