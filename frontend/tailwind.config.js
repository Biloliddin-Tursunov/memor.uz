/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
                serif: ['"Libre Caslon Text"', "serif"],
            },
            colors: {
                gray: {
                    50: "#F9F9F9",
                    100: "#F2F2F2",
                    200: "#E5E5E5",
                    700: "#404040",
                    900: "#000000",
                },
                bgMain: "var(--bg-main)",
                bgSidebar: "var(--bg-sidebar)",
                borderDark: "var(--border-color)",
                accent: "var(--accent)",
                accentHover: "var(--accent-hover)",
                textMain: "var(--text-main)",
                textMuted: "var(--text-muted)",
                cardBg: "var(--card-bg)",
            },
        },
    },
    plugins: [],
};
