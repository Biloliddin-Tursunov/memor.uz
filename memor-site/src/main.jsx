// src/main.jsx
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { injectSpeedInsights } from "@vercel/speed-insights";

// Asosiy App (Switcher) ni chaqiramiz
import App from "./App.jsx";

import "./shared/utils/i18n.js";

if (import.meta.env.PROD) injectSpeedInsights();

const root = createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);
