// tailwind.config.js
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        primaryLight: "#818cf8",
        primaryBg: "#eef2ff",
        secondary: "#ec4899",
        bg: "#f8fafc",
        card: "#ffffff",
        text: "#1e293b",
        muted: "#64748b",
        border: "#e2e8f0",
        green: "#22c55e",
        red: "#ef4444",
        orange: "#f59e0b",
      },
    },
  },
  plugins: [],
};
