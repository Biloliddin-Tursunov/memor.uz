import React, { useState } from "react";
import { Mic, ArrowRight, LayoutTemplate, Bot } from "lucide-react";

interface Props {
    onStartChat: (message: string) => void;
    onStartManual: () => void;
}

const IntroStep: React.FC<Props> = ({ onStartChat, onStartManual }) => {
    const [activeTab, setActiveTab] = useState<"ai" | "manual">("ai");
    const [inputValue, setInputValue] = useState("");

    const handleInputSubmit = () => {
        if (inputValue.trim()) {
            onStartChat(inputValue);
        }
    };

    return (
        <div className="flex flex-col h-full px-4 pt-6 pb-8 md:p-12 relative items-center">
            {/* Tab Switcher */}
            <div className="flex bg-slate-100 p-1 rounded-xl mb-12 md:mb-20 w-full max-w-md">
                <button
                    onClick={() => setActiveTab("ai")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${
                        activeTab === "ai"
                            ? "bg-white text-slate-900 shadow-sm"
                            : "text-slate-500 hover:text-slate-700"
                    }`}>
                    <Bot size={18} />
                    al-Me'mor
                </button>
                <button
                    onClick={() => setActiveTab("manual")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${
                        activeTab === "manual"
                            ? "bg-white text-slate-900 shadow-sm"
                            : "text-slate-500 hover:text-slate-700"
                    }`}>
                    <LayoutTemplate size={18} />
                    Maxsus
                </button>
            </div>

            {/* Content Area */}
            <div className="w-full max-w-2xl flex-1 flex flex-col items-center text-center">
                {activeTab === "ai" ? (
                    <div className="w-full fade-in flex flex-col h-full justify-center">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                            Nimani loyihalashtiramiz?
                        </h2>
                        <p className="text-slate-500 mb-12 max-w-lg mx-auto">
                            Orzuyingizdagi uy haqida yozing, va sun'iy intellekt
                            sizga loyiha yaratishda yordam beradi.
                        </p>

                        {/* Main Input for Chat */}
                        <div className="w-full relative group">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === "Enter" && handleInputSubmit()
                                }
                                placeholder="Masalan: 2 qavatli, hovlisi bor zamonaviy uy..."
                                className="w-full bg-white border-2 border-slate-200 px-6 py-5 pr-32 rounded-2xl text-lg text-slate-900 focus:outline-none focus:border-slate-900 focus:shadow-lg transition-all placeholder-slate-400 font-medium"
                                autoFocus
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                <button className="p-3 text-slate-400 hover:text-slate-600 transition-colors">
                                    <Mic size={24} />
                                </button>
                                <button
                                    onClick={handleInputSubmit}
                                    disabled={!inputValue.trim()}
                                    className="bg-slate-900 text-white p-3 rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                                    <ArrowRight size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full fade-in flex flex-col h-full justify-center items-center">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                            O'z loyihangizni yarating
                        </h2>
                        <p className="text-slate-500 mb-12 max-w-lg mx-auto">
                            Barcha detallarni o'zingiz tanlashni xohlasangiz,
                            bosqichma-bosqich konstruktordan foydalaning.
                        </p>

                        <button
                            onClick={onStartManual}
                            className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg flex items-center gap-3 w-full max-w-xs justify-center">
                            Boshlash <ArrowRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IntroStep;
