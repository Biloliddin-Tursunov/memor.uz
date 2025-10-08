import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./styles/style.css";
import "./styles/fonts.css";
import { injectSpeedInsights } from "@vercel/speed-insights";
import App from "./App.jsx";

// faqat productionda ishlaydi
if (import.meta.env.PROD) injectSpeedInsights();

// React 18 uchun to‘g‘ri init
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);
