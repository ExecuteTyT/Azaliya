/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./index.tsx"
  ],
  theme: {
    extend: {
      colors: {
        sand: '#FDFCF8',     /* Lighter, cleaner Cream */
        ink: '#2A1A10',      /* Deep Coffee/Black */
        spice: '#8B4513',    /* Accent Text */
        gold: '#D4AF37',     /* Classic Gold */
        saffron: '#F4C430',  /* Vibrant Yellow/Orange */
        honey: '#EBA937',    /* Rich Amber */
        mist: '#FFFDD0',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      cursor: {
        none: 'none',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'breathe': 'breathe 8s ease-in-out infinite',
        'morph': 'morph 8s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.05' },
          '50%': { transform: 'scale(1.1)', opacity: '0.1' },
        },
        morph: {
          '0%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }
        }
      }
    },
  },
  plugins: [],
}
