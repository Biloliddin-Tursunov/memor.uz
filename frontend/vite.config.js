import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    base: "/", // SPA root
    build: { outDir: "dist" },
    plugins: [react(), tailwindcss()],
});
