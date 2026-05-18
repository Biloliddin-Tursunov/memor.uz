import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.error("DIQQAT: API kalit topilmadi. .env faylni tekshiring.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "dummy_key" });
const systemInstruction = "Siz 'al-Me'mor' nomli professional arxitektor yordamchisiz. Foydalanuvchilarga uy loyihalashda yordam berasiz. O'zbek tilida gapiring. Javoblaringiz qisqa, aniq va do'stona bo'lsin.";

export const generateChatResponse = async (history: ChatMessage[], message: string): Promise<string> => {
    if (!apiKey) return "API Kalit kiritilmagan (Demo rejim).";

    try {
        const contents = [
            ...history.map((msg) => ({
                role: msg.role === "user" ? "user" : "model",
                parts: [{ text: msg.text }],
            })),
            { role: "user", parts: [{ text: message }] },
        ];

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents,
            config: { systemInstruction },
        });

        return response.text || "";
    } catch (error) {
        console.error("Gemini API Xatolik:", error);
        return "Uzr, tizimda xatolik yuz berdi. Birozdan keyin urinib ko'ring.";
    }
};

export const analyzeArea = async (location: string): Promise<string> => {
    if (!apiKey) return "API Kalit yo'q. (Demo tahlil)";

    try {
        const prompt = "Ushbu hududda uy qurish uchun qisqa va foydali arxitektura tahlilini yozing (o'zbek tilida, 2 gap): " + location;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        return response.text || "";
    } catch (e) {
        console.error("Analysis Error:", e);
        return "Hudud muvaffaqiyatli o'rganildi (Server javob bermadi).";
    }
};
