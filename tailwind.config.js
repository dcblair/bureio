/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "dark-cyan": "#363f43",
        "romance": "#f2efe8",
      },
    },
  },
  plugins: [],
}
