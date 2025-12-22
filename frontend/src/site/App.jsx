// src/site/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// --- PUBLIC SITE PAGES ---
// Eslatma: Agar sahifalar 'src/site/pages' ichida bo'lsa, yo'llarni shunga moslang:
import Home from "./pages/Home.jsx";
import Knowledge from "./pages/Knowledge.jsx";
import Action from "./pages/Action.jsx";
import Creation from "./pages/Creation.jsx";

// Utils & Styles
import "./shared/style.css";
import "./shared/fonts.css";

// --- SHARED COMPONENTS ---
// Shared papkasi src/shared ichida deb hisoblaymiz:
import LanguageSwitch from "./shared/utils/LanguageSwitch.jsx";

export default function SiteApp() {
    return (
        <>
            <LanguageSwitch />

            <main
                style={{
                    background:
                        "radial-gradient(circle at center, #1b2735 0%, #090a0f 100%)",
                    minHeight: "100vh",
                    width: "100%",
                }}
                className="bg-black text-white scroll-smooth">
                {/* Faqat Sayt Routelari */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/knowledge" element={<Knowledge />} />
                    <Route path="/action" element={<Action />} />
                    <Route path="/creation" element={<Creation />} />
                </Routes>
            </main>
        </>
    );
}
