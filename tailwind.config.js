/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '900': '900px',
        '300': '300px',
      },
      borderRadius: {
        'rounded': '50%',
      },
    },
  },
  plugins: [],
}