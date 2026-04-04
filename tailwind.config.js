// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./index.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#5B4FCF",
        primaryLight: "#7B6FEF",
        primaryBg: "#EEF0FF",
        secondary: "#e8365d",
        bg: "#F5F6FA",
        card: "#FFFFFF",
        text: "#1a1a2e",
        muted: "#64748b",
        border: "#e2e8f0",
        green: "#16a34a",
        red: "#dc2626",
        amber: "#d97706",
        teal: "#0d9488",
      },
    },
  },
  plugins: [],
};
