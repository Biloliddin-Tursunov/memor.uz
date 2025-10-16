// src/main.jsx
import React from "react";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Loading from "./components/Loading";
import "./i18n"; // MUST be imported before App uses useTranslation()

import "./styles/style.css";
import "./styles/fonts.css";
import { injectSpeedInsights } from "@vercel/speed-insights";
import App from "./App.jsx";

// faqat productionda ishlaydi
if (import.meta.env.PROD) injectSpeedInsights();

// React 18 uchun to‘g‘ri init
const root = createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
        <BrowserRouter>
            <Suspense fallback={<Loading />}>
                <App />
            </Suspense>
        </BrowserRouter>
    </StrictMode>
);
