/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'auve-forest': '#064638',
        'auve-dark': '#003D35',
        'auve-ivory': '#F1E7D2',
        'auve-sand': '#D8C7A8',
        'auve-neutral': '#F8F6F0',
        'auve-muted': '#8A9A86',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Manrope"', 'sans-serif'],
      },
      letterSpacing: {
        'luxury': '0.2em',
        'widest-luxury': '0.35em',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(0.5deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { opacity: '0.6' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.6' },
        }
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        floatSlow: 'floatSlow 9s ease-in-out infinite',
        shimmer: 'shimmer 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
