import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitch() {
    const { i18n } = useTranslation();
    const [lang, setLang] = useState(() => {
        return localStorage.getItem("i18nextLng") || i18n.language || "uz";
    });

    useEffect(() => {
        if (i18n.language !== lang) {
            i18n.changeLanguage(lang);
        }
        localStorage.setItem("i18nextLng", lang);
    }, [lang, i18n]);

    const btnClasses = (isActive) => `
        min-w-[60px] rounded-full border-none bg-transparent 
        font-medium tracking-[3px] cursor-pointer outline-none
        transition-all duration-1000 ease-in-out py-1
        focus-visible:ring-2 focus-visible:ring-white/10
        ${isActive ? "bg-white/20 text-white" : "text-white/70"}
    `;

    return (
        <div
            className="fixed top-[10px] right-[10px] z-[100] inline-flex items-center 
                       bg-white/20 backdrop-blur-sm rounded-full p-[2px] 
                       shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]
                       font-['MajorMonoMemor',sans-serif] text-[15px]"
            role="navigation"
            aria-label="Language switch"
        >
            <button
                className={btnClasses(lang === "uz")}
                onClick={() => setLang("uz")}
                aria-pressed={lang === "uz"}
            >
                uz
            </button>

            <button
                className={btnClasses(lang === "en")}
                onClick={() => setLang("en")}
                aria-pressed={lang === "en"}
            >
                en
            </button>
        </div>
    );
}