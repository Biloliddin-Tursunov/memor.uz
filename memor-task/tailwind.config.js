/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                space: {
                    bg: '#050510',
                    nebula: '#1a103c',
                },
                kraft: {
                    DEFAULT: '#d5c5a3',
                    light: '#e6dcc5',
                    dark: '#c4b087',
                    shadow: '#8c7b58'
                },
                ink: {
                    DEFAULT: '#1a1a1a',
                    light: '#2d2d2d',
                    blue: '#1e3a8a',
                    red: '#7f1d1d'
                },
                paper: {
                    white: '#f9f9f7'
                }
            },
            fontFamily: {
                serif: ['"Cormorant Garamond"', 'serif'],
                typewriter: ['"Courier Prime"', 'monospace'],
            },
            boxShadow: {
                'floating': '0 20px 30px -10px rgba(0, 0, 0, 0.5)',
                'deep': '0 30px 60px -12px rgba(0, 0, 0, 0.8)',
                'inner-light': 'inset 0 0 20px rgba(255,255,255,0.1)'
            },
            backgroundImage: {
                'paper-texture': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwMDAiIG9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')",
            }
        },
    },
    plugins: [],
}