import React from "react";
import { UploadCloud, Ruler, FileImage, ArrowRight } from "lucide-react";
import { ProjectType } from "../../types";

interface Props {
    type: ProjectType;
    onNext: () => void;
}

const DetailsStep: React.FC<Props> = ({ type, onNext }) => {
    const isInterior = type === "interior";

    return (
        <div className="flex flex-col h-full pt-4 max-w-3xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-serif text-slate-900 mb-2">
                    {isInterior ? "Xonadon rejasi" : "Mavjud uy holati"}
                </h2>
                <p className="text-slate-500 text-sm">
                    {isInterior
                        ? "Interyer dizayn qilish uchun xonadon planini yuklang yoki o'lchamlarni kiriting."
                        : "Rekonstruksiya uchun uyning hozirgi rasmlari yoki kadastr planini yuklang."}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Option 1: Upload */}
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-slate-900 hover:bg-slate-50 transition-all cursor-pointer group h-64">
                    <div className="bg-slate-100 p-4 rounded-full mb-4 group-hover:bg-slate-200 transition-colors">
                        <UploadCloud size={32} className="text-slate-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">
                        Fayl yuklash
                    </h3>
                    <p className="text-xs text-slate-400 mb-4">
                        PDF, JPG yoki PNG (Max 10MB)
                    </p>
                    <button className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5">
                        Tanlash
                    </button>
                </div>

                {/* Option 2: Manual Input */}
                <div className="border border-slate-200 rounded-xl p-8 flex flex-col h-64">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-slate-100 p-2 rounded-lg">
                            <Ruler size={24} className="text-slate-600" />
                        </div>
                        <h3 className="font-bold text-slate-900">
                            O'lchamlarni kiritish
                        </h3>
                    </div>

                    <div className="space-y-4 flex-1">
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">
                                Umumiy maydon (m²)
                            </label>
                            <input
                                type="number"
                                placeholder="0"
                                className="w-full border-b border-slate-300 py-2 focus:outline-none focus:border-slate-900 font-serif text-lg bg-transparent"
                            />
                        </div>
                        {!isInterior && (
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">
                                    Qavatlar soni
                                </label>
                                <input
                                    type="number"
                                    placeholder="1"
                                    className="w-full border-b border-slate-300 py-2 focus:outline-none focus:border-slate-900 font-serif text-lg bg-transparent"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-auto flex justify-end">
                <button
                    onClick={onNext}
                    className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg flex items-center gap-2 uppercase tracking-wide">
                    Davom etish
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default DetailsStep;
