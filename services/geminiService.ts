
import { GoogleGenAI } from "@google/genai";

// Fix: Refactored to initialize GoogleGenAI inside the function to ensure the latest API key is used
// and removed unused Type import.
export const getCommuteFeasibility = async (origin: string, destination: string) => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return "AI Assistant unavailable without API key.";

  // Create instance right before use to ensure it uses the current process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Evaluate a flight commute from ${origin} to ${destination} using the Sedai Aero eVTOL. 
      The aircraft has a 50-mile range and can land on water. 
      Analyze the distance (roughly), suggest if water landing/marina ports are viable, and give a 'Cool Factor' rating. 
      Keep the tone futuristic, luxurious, and encouraging.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });

    // Correct usage of .text property
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error calculating flight path. Please try again.";
  }
};
