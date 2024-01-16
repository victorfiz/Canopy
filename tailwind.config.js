/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      gradientColorStops: {
        'custom-start': '#123456',
        'custom-end': '#abcdef'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}