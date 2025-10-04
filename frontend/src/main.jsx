import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/style.css";
import "./styles/fonts.css";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { Analytics } from "@vercel/analytics/next";

if (import.meta.env.PROD) injectSpeedInsights();
if (import.meta.env.PROD) Analytics();

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
