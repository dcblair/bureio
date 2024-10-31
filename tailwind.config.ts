import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{html,js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 1.5s ease-in-out',
        'fade-out': 'fade-out 1.2s ease-in',
        'full-fade-in': 'full-fade-in 1s ease-in-out',
        'full-fade-out': 'full-fade-out 1s ease-in',
      },
      aspectRatio: {
        '9/16': '9 / 16',
      },
      colors: {
        'dark-cyan': '#363f43',
        'blanched-almond': '#ffebcd',
        'rich-black-fogra29': '#0D1F2D',
        ivory: '#fcfaee',
        romance: '#f2efe8',
      },
      fontFamily: {
        sans: ['Zen Kaku Gothic Antique', 'sans-serif'],
        questrial: ['Questrial', 'sans-serif'],
        zenKakuGothic: ['Zen Kaku Gothic', 'sans-serif'],
        mPlusOne: ['M Plus 1', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0.5' },
          '50%': { opacity: '0.7' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '50%': { opacity: '0.7' },
          '100%': { opacity: '0.5' },
        },
        'full-fade-in': {
          '0%': { opacity: '0' },
          '50%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
        'full-fade-out': {
          '0%': { opacity: '1' },
          '50%': { opacity: '0.6' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
