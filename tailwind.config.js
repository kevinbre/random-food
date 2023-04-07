/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "general-bg": "url('/src/assets/background.jpg')",
      },
      boxShadow: {
        "bg-opacity": "inset 0 0 0 1000px rgba(0, 0, 0, 0.95);",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
