import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./app/**/*.{ts,tsx}",
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                wellness: {
                    bg: "#d5f8d5",     // soft green background
                    accent: "#6FBF8E", // accents / icons
                },
                navy: {
                    DEFAULT: "#0A2540", // main text
                    dark: "#081C32",    // strong headings
                },
            },
        },
    },
    plugins: [],
};

export default config;
