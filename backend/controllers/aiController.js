import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import {
  conceptExplainPrompt,
  questionAnswerPrompt,
} from "../utils/prompts.js";

const getApiKey = () =>
  process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY || "";
const isOpenAiKey = (key) => key && key.startsWith("sk-");

// Generate Interview Question/Answer
export const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions, description } =
      req.body;
    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions,
      description,
    );
    const apiKey = getApiKey();
    let rawText = "";

    if (isOpenAiKey(apiKey)) {
      const openai = new OpenAI({ apiKey });
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      });
      rawText = completion.choices[0].message.content;
    } else {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });
      rawText = response.text;
    }

    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      let parsed = false;
      const jsonMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch && jsonMatch[1]) {
        try {
          data = JSON.parse(jsonMatch[1]);
          parsed = true;
        } catch (e) {
          // ignore, try fallback
        }
      }
      
      if (!parsed) {
        const startIdx = rawText.search(/[\{\[]/);
        const endIdx = rawText.search(/[\}\]][^}\]]*$/);
        if (startIdx !== -1 && endIdx !== -1 && endIdx >= startIdx) {
          try {
            data = JSON.parse(rawText.slice(startIdx, endIdx + 1));
          } catch(e) {
            throw new Error("Could not parse JSON after extraction");
          }
        } else {
          throw new Error("Could not parse JSON");
        }
      }
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Generate Interview Questions Error:", error);
    let errorMessage = "Failed to generate questions.";
    if (error && error.message) {
      try {
        const parsedError = JSON.parse(error.message);
        if (parsedError.error && parsedError.error.message) {
          errorMessage = parsedError.error.message;
        } else {
          errorMessage = error.message;
        }
      } catch(e) {
        errorMessage = error.message;
      }
    }
    
    res.status(500).json({
      message: errorMessage,
      error: error.message,
    });
  }
};

// Generate Concept Explaination Using Gemini API
export const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const prompt = conceptExplainPrompt(question);
    const apiKey = getApiKey();
    let rawText = "";

    if (isOpenAiKey(apiKey)) {
      const openai = new OpenAI({ apiKey });
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      });
      rawText = completion.choices[0].message.content;
    } else {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });
      rawText = response.text;
    }

    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      let parsed = false;
      const jsonMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch && jsonMatch[1]) {
        try {
          data = JSON.parse(jsonMatch[1]);
          parsed = true;
        } catch (e) {
          // ignore, try fallback
        }
      }
      
      if (!parsed) {
        const startIdx = rawText.search(/[\{\[]/);
        const endIdx = rawText.search(/[\}\]][^}\]]*$/);
        if (startIdx !== -1 && endIdx !== -1 && endIdx >= startIdx) {
          try {
            data = JSON.parse(rawText.slice(startIdx, endIdx + 1));
          } catch(e) {
            throw new Error("Could not parse JSON after extraction");
          }
        } else {
          throw new Error("Could not parse JSON");
        }
      }
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Generate Explanation Error:", error);
    let errorMessage = "Failed to generate explanation.";
    if (error && error.message) {
      try {
        const parsedError = JSON.parse(error.message);
        if (parsedError.error && parsedError.error.message) {
          errorMessage = parsedError.error.message;
        } else {
          errorMessage = error.message;
        }
      } catch(e) {
        errorMessage = error.message;
      }
    }
    
    res.status(500).json({
      message: errorMessage,
      error: error.message,
    });
  }
};
