// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .use(
        resourcesToBackend((lng, ns) =>
            import(`./locales/${lng}/${ns}.json`).catch((e) => {
                console.error("i18n import error:", e);
                // throw to let init know
                throw e;
            })
        )
    )
    .init({
        fallbackLng: "uz",
        supportedLngs: ["uz", "en"],
        ns: ["translation"],
        defaultNS: "translation",
        interpolation: { escapeValue: false },
        detection: {
            order: ["localStorage", "navigator", "htmlTag"],
            caches: ["localStorage"],
        },
        react: { useSuspense: true }, // agar Suspense ishlatmayotgan bo'lsang false ga o'zgartir
        debug: false,
    })
    .catch((err) => {
        console.error("i18n init failed:", err);
    });

export default i18n;
