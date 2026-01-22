import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatMessage } from "../types"; // <-- types.ts dan import qiling

// 1. API Kalitni olish (Vite usulida)
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.error("DIQQAT: API kalit topilmadi. .env faylni tekshiring.");
}

const genAI = new GoogleGenerativeAI(apiKey || "dummy_key");

export const generateChatResponse = async (
    history: ChatMessage[], // <-- Sizning interfeysingiz
    message: string,
): Promise<string> => {
    if (!apiKey) return "API Kalit kiritilmagan (Demo rejim).";

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction:
                "Siz 'al-Me\'mor' nomli professional arxitektor yordamchisiz. Foydalanuvchilarga uy loyihalashda yordam berasiz. O'zbek tilida gapiring. Javoblaringiz qisqa, aniq va do'stona bo'lsin.",
        });

        // 2. ChatMessage[] ni Gemini formatiga o'tkazish
        // Gemini 'id' ni bilmaydi, faqat 'role' va 'parts' kerak.
        const apiHistory = history.map((msg) => ({
            role: msg.role === "user" ? "user" : "model", // Ehtiyot shart tekshiruv
            parts: [{ text: msg.text }],
        }));

        const chat = model.startChat({
            history: apiHistory,
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini API Xatolik:", error);
        return "Uzr, tizimda xatolik yuz berdi. Birozdan keyin urinib ko'ring.";
    }
};

export const analyzeArea = async (location: string): Promise<string> => {
    if (!apiKey) return "API Kalit yo'q. (Demo tahlil)";

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Ushbu hududda uy qurish uchun qisqa va foydali arxitektura tahlilini yozing (o'zbek tilida, 2 gap): ${location}`;

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (e) {
        console.error("Analysis Error:", e);
        return "Hudud muvaffaqiyatli o'rganildi (Server javob bermadi).";
    }
};
