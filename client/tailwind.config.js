/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#4f46e5", // Indigo 600
                secondary: "#0891b2", // Cyan 600
                background: "#ffffff", // Pure White
                surface: "#f8fafc", // Slate 50
                surfaceHighlight: "#f1f5f9", // Slate 100
                text: {
                    main: "#0f172a", // Slate 900
                    muted: "#64748b", // Slate 500
                    light: "#94a3b8", // Slate 400
                },
                border: "#e2e8f0", // Slate 200
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                heading: ['Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                'glow': '0 0 15px rgba(79, 70, 229, 0.1)',
            }
        },
    },
    plugins: [],
}
