/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      fontFamily: {
        'serif': ['Erode', ...defaultTheme.fontFamily.serif],
        'sans': ['Satoshi', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        'slide': {
          '0%': {
            top: '0'
          },
          '25%': {
            top: '-1.2em'
          },
          '50%': {
            top: '-2.4em'
          },
          '75%': {
            top: '-3.6em'
          }
        }
      },
      animation: {
        'lets-talk-slide': 'slide 10s linear infinite',
      }
    },
  },
  plugins: [],
}
