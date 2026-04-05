import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import { conceptExplainPrompt, questionAnswerPrompt } from "../utils/prompts.js"

const getApiKey = () => process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY || "";
const isOpenAiKey = (key) => key && key.startsWith("sk-");

// Generate Interview Question/Answer 
export const generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, numberOfQuestions, description } = req.body;
        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "Missing required fields." })
        }
        
        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions, description);
        const apiKey = getApiKey();
        let rawText = "";

        if (isOpenAiKey(apiKey)) {
            const openai = new OpenAI({ apiKey });
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }]
            });
            rawText = completion.choices[0].message.content;
        } else {
            const ai = new GoogleGenAI({ apiKey });
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash-lite",
                contents: prompt
            });
            rawText = response.text;
        }

        let data;
        try {
            data = JSON.parse(rawText);
        } catch {
            const jsonMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
            if (jsonMatch && jsonMatch[1]) {
                data = JSON.parse(jsonMatch[1]);
            } else {
                const startIdx = rawText.search(/[\{\[]/);
                const endIdx = rawText.search(/[\}\]][^}\]]*$/);
                if (startIdx !== -1 && endIdx !== -1 && endIdx >= startIdx) {
                    data = JSON.parse(rawText.slice(startIdx, endIdx + 1));
                } else {
                    throw new Error("Could not parse JSON");
                }
            }
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            message: "Failed to generate questions.",
            error: error.message
        })
    }
}

// Generate Concept Explaination Using Gemini API
export const generateConceptExplanation = async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ message: "Missing required fields." })
        }

        const prompt = conceptExplainPrompt(question);
        const apiKey = getApiKey();
        let rawText = "";

        if (isOpenAiKey(apiKey)) {
            const openai = new OpenAI({ apiKey });
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }]
            });
            rawText = completion.choices[0].message.content;
        } else {
            const ai = new GoogleGenAI({ apiKey });
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash-lite",
                contents: prompt,
            });
            rawText = response.text;
        }

        let data;
        try {
            data = JSON.parse(rawText);
        } catch {
            const jsonMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
            if (jsonMatch && jsonMatch[1]) {
                data = JSON.parse(jsonMatch[1]);
            } else {
                const startIdx = rawText.search(/[\{\[]/);
                const endIdx = rawText.search(/[\}\]][^}\]]*$/);
                if (startIdx !== -1 && endIdx !== -1 && endIdx >= startIdx) {
                    data = JSON.parse(rawText.slice(startIdx, endIdx + 1));
                } else {
                    throw new Error("Could not parse JSON");
                }
            }
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            message: "Failed to generate explanation.",
            error: error.message
        })
    }
}