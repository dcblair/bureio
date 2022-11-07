/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "fade-in": "fade-in 2s ease-in-out",
        "fade-out": "fade-out 1.9s ease-in",
        "full-fade-in": "full-fade-in 1s ease-in-out",
        "full-fade-out": "full-fade-out 1s ease-in"
      },
      aspectRatio: {
        "9/16": "9 / 16"
      },
      colors: {
        "dark-cyan": "#363f43",
        "blanched-almond": "#ffebcd",
        "rich-black-fogra29": "#0D1F2D",
        "ivory": "#fcfaee",
        "romance": "#f2efe8",
      },
      fontFamily: {
        "questrial": ["Questrial", "sans-serif"],
        "zen-kaku-gothic": ["Zen Kaku Gothic", "sans-serif"],
        "m-plus-one": ["M Plus 1", "sans-serif"]
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: .3 },
          "50%": { opactiy: .7 },
          "100%": { opacity: 1 }
        },
        "fade-out": {
          "0%": { opacity: 1 },
          "50%": { opactiy: .7 },
          "100%": { opacity: .3 }
        },
        "full-fade-in": {
          "0%": { opacity: 0 },
          "50%": { opactiy: .4 },
          "100%": { opacity: 1 }
        },
        "full-fade-out": {
          "0%": { opacity: 1 },
          "50%": { opactiy: .6 },
          "100%": { opacity: 0 }
        },
      }
    },
  },
  plugins: [],
}
