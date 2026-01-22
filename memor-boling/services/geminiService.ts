import { GoogleGenAI } from "@google/genai";

// Safe access to process.env.API_KEY.
// In a browser environment without a bundler polyfill, 'process' might be undefined.
// We default to an empty string to allow the app to load (API calls will fail gracefully later if key is missing).
let apiKey = '';
try {
  if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
    apiKey = process.env.API_KEY;
  }
} catch (e) {
  // Ignore reference errors if process is not defined
  console.warn("Environment variable access failed", e);
}

const ai = new GoogleGenAI({ apiKey });

export const generateChatResponse = async (history: { role: string; text: string }[], message: string): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: "You are an expert architect assistant named 'al-Me'mor'. You help users design their homes. Speak in Uzbek. Be professional but friendly.",
      },
    });

    const result = await chat.sendMessage({ message });
    return result.text || "Uzr, hozir javob bera olmayman.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Tizimda xatolik yuz berdi. Iltimos qayta urinib ko'ring.";
  }
};

export const analyzeArea = async (location: string): Promise<string> => {
   try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the architectural potential for a home in this location: ${location}. Keep it short (1 sentence) in Uzbek.`,
    });
    return response.text || "Hudud analiz qilindi.";
  } catch (e) {
    console.error("Analysis Error:", e);
    return "Hudud muvaffaqiyatli o'rganildi (Demo).";
  }
}