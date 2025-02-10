import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fade-in 1.5s ease-in-out",
        "fade-out": "fade-out 1.2s ease-in",
        "full-fade-in": "full-fade-in 1s ease-in-out",
        "full-fade-out": "full-fade-out 1s ease-in",
        float: "float 3s infinite ease",
        collapse: "collapse 2s both ease-in",
        expand: "expand 1.7s both ease-in",
      },
      aspectRatio: {
        "9/16": "9 / 16",
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
        "4xl": "0 50px 100px -20px rgba(0, 0, 0, 0.3)",
        "5xl": "0 50px 100px -20px rgba(0, 0, 0, 0.6)",
      },
      colors: {
        "dark-cyan": "#363f43",
        "blanched-almond": "#ffebcd",
        "rich-black-fogra29": "#0D1F2D",
        ivory: "#fcfaee",
        romance: "#f2efe8",
      },
      fontFamily: {
        sans: ["Zen Kaku Gothic Antique", "sans-serif"],
        questrial: ["Questrial", "sans-serif"],
        zenKakuGothic: ["Zen Kaku Gothic", "sans-serif"],
        mPlusOne: ["M Plus 1", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0.5" },
          "50%": { opacity: "0.7" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "50%": { opacity: "0.7" },
          "100%": { opacity: "0.5" },
        },
        "full-fade-in": {
          "0%": { opacity: "0" },
          "50%": { opacity: "0.5" },
          "100%": { opacity: "1" },
        },
        "full-fade-out": {
          "0%": { opacity: "1" },
          "50%": { opacity: "0.6" },
          "100%": { opacity: "0" },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0%)",
          },
          "50%": {
            transform: "translateY(2%)",
          },
        },
        collapse: {
          "0%": { transform: "translateY(0%)", opacity: "1" },
          "50%": { transform: "translateY(10%)", opacity: "0" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
        expand: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "50%": { transform: "translateY(10%)", opacity: "0" },
          "100%": {
            transform: "translateY(0%)",
            opacity: "1",
          },
        },
      },
      transitionDuration: {
        "2000": "2000ms",
        "3000": "3000ms",
        "4000": "4000ms",
        "5000": "5000ms",
        "7500": "7500ms",
        "10000": "10000ms",
      },
    },
  },
  plugins: [require("autoprefixer")],
} satisfies Config;
