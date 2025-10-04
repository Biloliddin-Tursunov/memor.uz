import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/style.css";
import "./styles/fonts.css";
import { injectSpeedInsights } from "@vercel/speed-insights";
if (import.meta.env.PROD) injectSpeedInsights();

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
