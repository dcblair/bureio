/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "dark-cyan": "#363f43",
        "blanched-almond": "#ffebcd",
        "rich-black-fogra29": "#0D1F2D",
        "ivory": "#fcfaee",
        "romance": "#f2efe8",
      },
      fontFamily: {
        "questrial": ["Questrial", "sans-serif"]
      }
    },
  },
  plugins: [],
}
