/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "fade-in": "fade-in 10s ease-in-out"
      },
      colors: {
        "dark-cyan": "#363f43",
        "blanched-almond": "#ffebcd",
        "rich-black-fogra29": "#0D1F2D",
        "ivory": "#fcfaee",
        "romance": "#f2efe8",
      },
      fontFamily: {
        "questrial": ["Questrial", "sans-serif"]
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "50%": { opacity: 40 },
          "100%": { opacity: 100 }
        }
      }
    },
  },
  plugins: [],
}
