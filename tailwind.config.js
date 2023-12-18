/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'comfortaa': ['"Comfortaa"', 'sans-serif'],
        'muli': ['"Mulish"', 'sans-serif']
      },
      colors: {
        'brand-red': '#a20f20',
      }
    },
  },
  plugins: [],
}

