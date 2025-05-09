import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Enable toggling dark mode with a class
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(220, 20%, 98%)",
        foreground: "hsl(220, 15%, 10%)",
        primary: {
          DEFAULT: "#3B82F6",      // blue-500
          light: "#60A5FA",        // blue-400
          dark: "#2563EB",         // blue-600
          glow: "rgba(59, 130, 246, 0.5)", // for glow effect
        },
        glass: {
          light: "rgba(255, 255, 255, 0.6)", // frosted light
          dark: "rgba(24, 24, 27, 0.5)",     // frosted dark
        },
        muted: {
          light: "#F3F4F6", // gray-100
          dark: "#1F2937",  // gray-800
        },
        text: {
          muted: "#6B7280", // gray-500
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      backdropBlur: {
        soft: "8px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(59, 130, 246, 0.5)",
      },
      transitionProperty: {
        glow: "box-shadow",
        blur: "backdrop-filter",
      },
    },
  },
  plugins: [],
};

export default config;
