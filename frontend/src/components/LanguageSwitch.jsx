import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/components/langswitch.css";

export default function LanguageSwitch() {
    const { i18n } = useTranslation();
    const [lang, setLang] = useState(() => {
        // inizial holat: i18n.language yoki localStorage
        return localStorage.getItem("i18nextLng") || i18n.language || "uz";
    });

    useEffect(() => {
        if (i18n.language !== lang) {
            i18n.changeLanguage(lang);
        }
        localStorage.setItem("i18nextLng", lang);
    }, [lang, i18n]);

    return (
        <div
            className="lang-switch"
            role="navigation"
            aria-label="Language switch">
            <button
                className={`lang-switch__btn ${
                    lang === "uz" ? "is-active" : ""
                }`}
                onClick={() => setLang("uz")}
                aria-pressed={lang === "uz"}>
                uz
            </button>

            <button
                className={`lang-switch__btn ${
                    lang === "en" ? "is-active" : ""
                }`}
                onClick={() => setLang("en")}
                aria-pressed={lang === "en"}>
                en
            </button>
        </div>
    );
}
