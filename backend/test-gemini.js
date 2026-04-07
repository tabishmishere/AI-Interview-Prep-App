import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const testGemini = async () => {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        console.log("Found Key:", apiKey ? "Yes" : "No");
        
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: "Hi, respond with 'gemini works'"
        });
        
        console.log("Response:", response.text);
    } catch (e) {
        console.error("Error:", e.message);
    }
}

testGemini();
