/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Subjectivity', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
