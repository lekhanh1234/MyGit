/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sofia: ['"Sofia Sans Semi Condensed"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
