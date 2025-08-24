/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#1E1E2F",
          surface: "#2A2A3C",
          text: "#D1D5DB",
          muted: "#9CA3AF",
          border: "#3F3F4E",
          accent: "#8B5CF6",
          danger: "#EF4444",
          success: "#10B981",
          warning: "#F59E0B",
          info: "#3B82F6",
        },
      },
      extend: {
  animation: {
    'fade-in': 'fadeIn 0.3s ease-out',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
  },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
}
