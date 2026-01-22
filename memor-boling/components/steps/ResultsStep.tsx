import React, { useState } from "react";
import {
    Download,
    Share2,
    Layers,
    Image as ImageIcon,
    FileText,
    CheckCircle2,
} from "lucide-react";

const ResultsStep: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
    const [activeTab, setActiveTab] = useState<"render" | "plan" | "smeta">(
        "render",
    );
    const [showOrderModal, setShowOrderModal] = useState(false);

    // Mock Smeta Data
    const smetaData = [
        { item: "Loyiha hujjatlari", cost: "$1,200" },
        { item: "Fundament ishlari", cost: "$8,500" },
        { item: "Devor va to'siqlar", cost: "$12,000" },
        { item: "Tom yopish", cost: "$6,500" },
        { item: "Muhandislik tarmoqlari", cost: "$4,000" },
        { item: "Pardozlash ishlari (Black)", cost: "$5,000" },
        { item: "Jami", cost: "$37,200", bold: true },
    ];

    const handleOrder = () => {
        setShowOrderModal(true);
    };

    return (
        <div className="h-full flex flex-col relative">
            {/* Header Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 shrink-0">
                <h2 className="text-2xl md:text-3xl font-serif text-slate-900">
                    Sizning loyihangiz
                </h2>
                <div className="flex gap-2">
                    <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors">
                        <Share2 size={18} />
                    </button>
                    <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors">
                        <Download size={18} />
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 mb-6 shrink-0">
                <button
                    onClick={() => setActiveTab("render")}
                    className={`px-6 py-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${activeTab === "render" ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400 hover:text-slate-600"}`}>
                    <ImageIcon size={16} /> 3D Vizualizatsiya
                </button>
                <button
                    onClick={() => setActiveTab("plan")}
                    className={`px-6 py-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${activeTab === "plan" ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400 hover:text-slate-600"}`}>
                    <Layers size={16} /> Chizma (Plan)
                </button>
                <button
                    onClick={() => setActiveTab("smeta")}
                    className={`px-6 py-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${activeTab === "smeta" ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400 hover:text-slate-600"}`}>
                    <FileText size={16} /> Smeta
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto mb-6">
                {activeTab === "render" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="col-span-1 md:col-span-2 h-64 md:h-80 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative group">
                            <img
                                src="https://images.unsplash.com/photo-1600596542815-e328d4de4bf7?auto=format&fit=crop&q=80&w=1600"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-xs font-bold uppercase backdrop-blur-md">
                                Asosiy ko'rinish
                            </div>
                        </div>
                        <div className="h-48 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative">
                            <img
                                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="h-48 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative">
                            <img
                                src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=800"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}

                {activeTab === "plan" && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 h-full min-h-[400px] flex items-center justify-center animate-in fade-in zoom-in duration-300">
                        <img
                            src="https://picsum.photos/seed/floorplan2/800/600?grayscale"
                            className="max-w-full max-h-full object-contain rounded shadow-sm bg-white p-2"
                        />
                    </div>
                )}

                {activeTab === "smeta" && (
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                            <h3 className="font-bold text-slate-800">
                                Dastlabki hisob-kitob
                            </h3>
                            <span className="text-xs text-slate-500 bg-slate-200 px-2 py-1 rounded">
                                Taxminiy +/- 10%
                            </span>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {smetaData.map((row, idx) => (
                                <div
                                    key={idx}
                                    className={`flex justify-between px-6 py-4 ${row.bold ? "bg-slate-900 text-white font-bold text-lg" : "text-slate-600"}`}>
                                    <span>{row.item}</span>
                                    <span>{row.cost}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col md:flex-row justify-end mt-auto gap-4 pt-4 border-t border-slate-100">
                <div className="flex-1 text-xs text-slate-400 flex items-center">
                    * Bu avtomatik yaratilgan loyiha. Aniq hisob-kitob va rasmiy
                    loyiha uchun mutaxassislarimizga murojaat qiling.
                </div>
                <button
                    onClick={handleOrder}
                    className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg flex items-center justify-center gap-2 uppercase tracking-wide md:w-auto w-full">
                    <CheckCircle2 size={18} />
                    Buyurtma berish
                </button>
            </div>

            {/* Simple Order Modal Overlay */}
            {showOrderModal && (
                <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur flex items-center justify-center p-6 animate-in fade-in duration-200">
                    <div className="max-w-md w-full bg-white border border-slate-200 shadow-2xl rounded-2xl p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={32} />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">
                            So'rovingiz qabul qilindi!
                        </h3>
                        <p className="text-slate-500 mb-8">
                            Mutaxassislarimiz siz kiritgan ma'lumotlar asosida
                            24 soat ichida siz bilan bog'lanishadi va aniq
                            tijorat taklifini berishadi.
                        </p>
                        <button
                            onClick={() => onFinish()}
                            className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800">
                            Tushunarli, rahmat
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResultsStep;
