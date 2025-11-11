/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#0b0f14',
        neon: '#00d0ff',
        electric: '#39f0ff',
        violet: '#8b5cf6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Poppins', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};