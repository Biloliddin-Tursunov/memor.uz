import React, { useState } from "react";
import {
    Download,
    Share2,
    Layers,
    Image as ImageIcon,
    FileText,
    CheckCircle2,
    Building2,
    Link as LinkIcon,
    FileCheck,
} from "lucide-react";

const ResultsStep: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
    const [activeTab, setActiveTab] = useState<"render" | "plan" | "smeta">(
        "render",
    );
    const [activeModal, setActiveModal] = useState<"legalize" | "link" | null>(
        null,
    );

    // Mock Smeta Data for Uzbekistan context
    const smetaData = [
        { item: "Loyiha chizmalari (Arxitektura)", cost: "3 000 000 so'm" },
        { item: "3D Vizualizatsiya", cost: "2 000 000 so'm" },
        { item: "Konstruktiv yechimlar", cost: "2 500 000 so'm" },
        { item: "Muhandislik tarmoqlari", cost: "1 500 000 so'm" },
        { item: "Kadastr hujjatlashtirish", cost: "1 000 000 so'm" },
        { item: "Jami loyiha qiymati", cost: "10 000 000 so'm", bold: true },
    ];

    const handleCopyLink = () => {
        // Simulate copying to clipboard
        navigator.clipboard.writeText(
            "https://memor.uz/project/share/x89s-21d",
        );
        setActiveModal("link");
        setTimeout(() => setActiveModal(null), 3000);
    };

    const handleDownload = () => {
        // Simulate download
        const link = document.createElement("a");
        link.href = "#";
        link.download = "loyiha_hujjatlari.pdf";
        // In a real app, this would point to a blob or URL
        alert("Hujjatlar yuklanmoqda...");
    };

    return (
        <div className="h-full flex flex-col relative">
            {/* Header Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 shrink-0">
                <div>
                    <h2 className="text-2xl md:text-3xl font-serif text-slate-900">
                        Sizning loyihangiz
                    </h2>
                    <p className="text-slate-500 text-xs md:text-sm mt-1">
                        Loyiha ID: #MEM-2025-X89 • Holati:{" "}
                        <span className="text-green-600 font-bold">
                            Dastlabki versiya
                        </span>
                    </p>
                </div>

                <div className="flex gap-2">
                    <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors">
                        <Share2 size={18} />
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 mb-6 shrink-0 overflow-x-auto scrollbar-hide">
                <button
                    onClick={() => setActiveTab("render")}
                    className={`px-4 md:px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === "render" ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400 hover:text-slate-600"}`}>
                    <ImageIcon size={16} /> 3D Render
                </button>
                <button
                    onClick={() => setActiveTab("plan")}
                    className={`px-4 md:px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === "plan" ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400 hover:text-slate-600"}`}>
                    <Layers size={16} /> Chizma (Plan)
                </button>
                <button
                    onClick={() => setActiveTab("smeta")}
                    className={`px-4 md:px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === "smeta" ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400 hover:text-slate-600"}`}>
                    <FileText size={16} /> Smeta
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto mb-6 pr-1">
                {activeTab === "render" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="col-span-1 md:col-span-2 h-64 md:h-80 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative group bg-slate-100">
                            <img
                                src="https://images.unsplash.com/photo-1600596542815-e328d4de4bf7?auto=format&fit=crop&q=80&w=1600"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                alt="Main Render"
                            />
                            <div className="absolute bottom-4 left-4 bg-white/90 text-slate-900 px-3 py-1 rounded text-xs font-bold uppercase backdrop-blur-md shadow-sm">
                                Asosiy fasad
                            </div>
                        </div>
                        <div className="h-48 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative bg-slate-100 group">
                            <img
                                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                alt="Interior"
                            />
                            <div className="absolute bottom-4 left-4 bg-white/90 text-slate-900 px-3 py-1 rounded text-xs font-bold uppercase backdrop-blur-md shadow-sm">
                                Interyer
                            </div>
                        </div>
                        <div className="h-48 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative bg-slate-100 group">
                            <img
                                src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=800"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                alt="Detail"
                            />
                            <div className="absolute bottom-4 left-4 bg-white/90 text-slate-900 px-3 py-1 rounded text-xs font-bold uppercase backdrop-blur-md shadow-sm">
                                Hovli
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "plan" && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 h-full min-h-[400px] flex items-center justify-center animate-in fade-in zoom-in duration-300 relative">
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                            <div className="w-64 h-64 border-4 border-slate-900 rounded-full"></div>
                        </div>
                        <img
                            src="https://picsum.photos/seed/floorplan2/800/600?grayscale"
                            className="max-w-full max-h-full object-contain rounded shadow-sm bg-white p-4"
                            alt="Plan"
                        />
                    </div>
                )}

                {activeTab === "smeta" && (
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                            <h3 className="font-bold text-slate-800">
                                Xizmatlar ro'yxati
                            </h3>
                            <span className="text-xs text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded">
                                2024 Narxlari
                            </span>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {smetaData.map((row, idx) => (
                                <div
                                    key={idx}
                                    className={`flex justify-between px-6 py-4 items-center ${row.bold ? "bg-slate-900 text-white font-bold text-lg" : "text-slate-600 hover:bg-slate-50 transition-colors"}`}>
                                    <span
                                        className={
                                            row.bold
                                                ? ""
                                                : "text-sm font-medium"
                                        }>
                                        {row.item}
                                    </span>
                                    <span
                                        className={
                                            row.bold
                                                ? ""
                                                : "text-sm font-bold text-slate-900"
                                        }>
                                        {row.cost}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-slate-50 text-center">
                            <p className="text-xs text-slate-400">
                                Narxlar taxminiy va loyiha murakkabligiga qarab
                                o'zgarishi mumkin.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Actions Area - Replaced single button with 3 specific actions */}
            <div className="flex flex-col md:flex-row gap-3 pt-4 border-t border-slate-100 bg-white">
                {/* Action 1: Download */}
                <button
                    onClick={handleDownload}
                    className="flex-1 md:flex-none px-6 py-3.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wide group">
                    <Download
                        size={18}
                        className="text-slate-400 group-hover:text-slate-600"
                    />
                    <span className="hidden md:inline">Yuklab olish</span>
                    <span className="md:hidden">Yuklash</span>
                </button>

                {/* Action 2: Save Link */}
                <button
                    onClick={handleCopyLink}
                    className="flex-1 md:flex-none px-6 py-3.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wide group">
                    <LinkIcon
                        size={18}
                        className="text-slate-400 group-hover:text-slate-600"
                    />
                    <span className="hidden md:inline">Linkni saqlash</span>
                    <span className="md:hidden">Link</span>
                </button>

                {/* Action 3: Legalize (Primary Call to Action) */}
                <button
                    onClick={() => setActiveModal("legalize")}
                    className="flex-[2] bg-slate-900 text-white px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2 uppercase tracking-wide transform hover:scale-[1.01]">
                    <FileCheck size={18} />
                    <span className="md:inline hidden">
                        Hukumatdan ro'yxatdan o'tkazish
                    </span>
                    <span className="md:hidden inline">Rasmiylashtirish</span>
                </button>
            </div>

            {/* --- Modals --- */}

            {/* Legalize Modal */}
            {activeModal === "legalize" && (
                <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur flex items-center justify-center p-6 animate-in fade-in duration-200 rounded-2xl">
                    <div className="max-w-md w-full bg-white border border-slate-200 shadow-2xl rounded-2xl p-8 text-center relative">
                        <button
                            onClick={() => setActiveModal(null)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                            ✕
                        </button>
                        <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <Building2 size={32} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900 mb-2">
                            Rasmiylashtirish
                        </h3>
                        <p className="text-slate-500 mb-6 text-sm leading-relaxed">
                            Ushbu loyihani davlat kadastr va arxitektura
                            bo'limlaridan ro'yxatdan o'tkazish uchun ariza
                            qoldiring. Mutaxassislarimiz siz bilan
                            bog'lanishadi.
                        </p>

                        <form className="space-y-4 mb-6 text-left">
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                    F.I.SH
                                </label>
                                <input
                                    type="text"
                                    className="w-full border-b border-slate-300 py-2 focus:outline-none focus:border-slate-900 bg-transparent text-slate-900 font-medium"
                                    placeholder="Ism Familiya"
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                    Bog'lanish uchun
                                </label>
                                <input
                                    type="tel"
                                    className="w-full border-b border-slate-300 py-2 focus:outline-none focus:border-slate-900 bg-transparent text-slate-900 font-medium"
                                    placeholder="+998 90 ..."
                                />
                            </div>
                        </form>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setActiveModal(null)}
                                className="flex-1 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 text-sm uppercase tracking-wide">
                                Bekor qilish
                            </button>
                            <button
                                onClick={() => {
                                    setActiveModal(null);
                                    onFinish();
                                }}
                                className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 text-sm uppercase tracking-wide shadow-md">
                                Yuborish
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Link Copied Toast */}
            {activeModal === "link" && (
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom-5 fade-in z-50">
                    <CheckCircle2 size={16} className="text-green-400" />
                    <span className="text-sm font-medium">
                        Link buferga nusxalandi!
                    </span>
                </div>
            )}
        </div>
    );
};

export default ResultsStep;
