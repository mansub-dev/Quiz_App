/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '500': '500px',
        '800': '800px',
        '900': '900px',
        '1200px': '1200px',

      },
    },
  },
  plugins: [],
}