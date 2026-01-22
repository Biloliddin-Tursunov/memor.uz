import React, { useState } from "react";
import { ArrowRight, Box } from "lucide-react";

const StyleStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
    const [selected, setSelected] = useState<number | null>(null);

    const styles = [
        { name: "Minimalizm", color: "bg-slate-100" },
        { name: "Hi-Tech", color: "bg-slate-200" },
        { name: "Neoklassika", color: "bg-slate-50" },
        { name: "Modern", color: "bg-gray-100" },
        { name: "Loft", color: "bg-zinc-100" },
        { name: "Skandinaviya", color: "bg-neutral-50" },
        { name: "Sharqona", color: "bg-stone-100" },
        { name: "Eko-uslub", color: "bg-emerald-50/30" },
    ];

    return (
        <div className="flex flex-col h-full pt-2">
            <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-serif text-slate-900 mb-2">
                    Uslubni tanlang
                </h2>
                <p className="text-slate-500 text-sm">
                    Dizayn yo'nalishini belgilang. Sun'iy intellekt shunga
                    asoslanib taklif beradi.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-y-auto pb-4 px-2">
                {styles.map((style, i) => (
                    <div
                        key={i}
                        onClick={() => setSelected(i)}
                        className={`aspect-square rounded-2xl border-2 cursor-pointer transition-all relative group overflow-hidden flex flex-col
                ${selected === i ? "border-slate-900 ring-1 ring-slate-900" : "border-slate-200 hover:border-slate-400"}
             `}>
                        {/* Skeleton / Abstract Visual */}
                        <div
                            className={`flex-1 w-full ${style.color} flex items-center justify-center relative`}>
                            {/* Abstract Shapes simulating architecture */}
                            <div className="absolute inset-4 border-2 border-slate-300/50 rounded-lg"></div>
                            <div className="absolute bottom-4 left-4 right-12 h-2 bg-slate-300/50 rounded"></div>
                            <div className="absolute top-8 right-8 w-8 h-8 bg-slate-300/50 rounded-full"></div>

                            <Box
                                className="text-slate-300 opacity-50"
                                size={40}
                                strokeWidth={1}
                            />
                        </div>

                        {/* Label */}
                        <div className="p-3 bg-white text-center border-t border-slate-100">
                            <span
                                className={`text-xs font-bold uppercase tracking-wider ${selected === i ? "text-slate-900" : "text-slate-500"}`}>
                                {style.name}
                            </span>
                        </div>

                        {/* Checkmark overlay */}
                        {selected === i && (
                            <div className="absolute top-2 right-2 bg-slate-900 text-white p-1 rounded-full shadow-sm">
                                <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="3"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-auto pt-4 flex justify-end">
                <button
                    onClick={onNext}
                    disabled={selected === null}
                    className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg flex items-center gap-2 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed">
                    Tasdiqlash <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default StyleStep;
