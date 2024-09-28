/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      textFillColor: theme => theme('colors'),
      fontFamily: {
        oswald: ['Oswald','sans-serif'],
        shad: ["Shadows Into Light", "cursive"],
      }
    },
  },
  plugins: [],
}

