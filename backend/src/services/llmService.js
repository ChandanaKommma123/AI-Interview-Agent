import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not configured.");
}

const ai = new GoogleGenAI({
  apiKey
});

const MODEL = "gemini-3.5-flash-lite";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function generateText(prompt) {

  console.log("Gemini request started...");

  try {

    const response =
      await ai.models.generateContent({

        model: MODEL,

        contents: prompt

      });

    const text =
      response.text;

    if (!text) {

      throw new Error(
        "Gemini returned an empty response."
      );

    }

    console.log(
      "Gemini response received."
    );

    return text;

  } catch (error) {

    console.error(
      "Gemini API error:",
      error.message
    );

    if (error.status === 429) {

      throw new Error(
        "Gemini quota exceeded. Please use another Gemini project/API key or wait for the quota to reset."
      );

    }

    throw error;

  }
}