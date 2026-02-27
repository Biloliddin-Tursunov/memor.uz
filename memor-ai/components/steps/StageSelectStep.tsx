import React from "react";
import {
    MapPin,
    Home,
    Lightbulb,
    LucideIcon,
    ArrowRight,
    Sofa,
} from "lucide-react";

interface OptionProps {
    icon: LucideIcon;
    title: string;
    desc: string;
    onClick: () => void;
}

const Option: React.FC<OptionProps> = ({
    icon: Icon,
    title,
    desc,
    onClick,
}) => (
    <button
        onClick={onClick}
        className="flex flex-col items-start p-6 rounded-xl border border-slate-200 bg-white hover:border-slate-900 hover:shadow-lg transition-all text-left group w-full h-full">
        <div className="bg-slate-50 p-3 rounded-lg mb-4 group-hover:bg-slate-900 group-hover:text-white transition-colors border border-slate-100 text-slate-600">
            <Icon size={24} strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">
            {title}
        </h3>
        <p className="text-slate-500 leading-relaxed text-xs md:text-sm font-medium">
            {desc}
        </p>
        <div className="mt-auto pt-4 flex items-center text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-900 transition-colors">
            Tanlash <ArrowRight size={14} className="ml-2" />
        </div>
    </button>
);

const StageSelectStep: React.FC<{ onNext: (type: string) => void }> = ({
    onNext,
}) => {
    return (
        <div className="h-full flex flex-col pt-4">
            <h2 className="text-2xl md:text-3xl font-serif mb-8 text-slate-900 text-center">
                Qaysi bosqichdamiz?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl mx-auto">
                <Option
                    icon={MapPin}
                    title="Yer bor"
                    desc="Yeringiz bor, lekin hali loyiha yo'qmi? Biz noldan boshlaymiz."
                    onClick={() => onNext("land")}
                />
                <Option
                    icon={Home}
                    title="Uy bor"
                    desc="Mavjud uyni qayta ta'mirlash yoki rekonstruksiya qilish."
                    onClick={() => onNext("house")}
                />
                <Option
                    icon={Sofa}
                    title="Bo'sh uy"
                    desc="Uy qurilgan, lekin ichi bo'sh. Interyer dizayn kerak."
                    onClick={() => onNext("interior")}
                />
                <Option
                    icon={Lightbulb}
                    title="G'oya bor"
                    desc="Faqat orzuyingiz bor. Biz uni haqiqatga aylantirishga yordam beramiz."
                    onClick={() => onNext("idea")}
                />
            </div>
        </div>
    );
};

export default StageSelectStep;
