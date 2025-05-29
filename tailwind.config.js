/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",  // violet-600 (can be adjusted)
        secondary: "#EEF2FF", // very light violet
        accent: "#16A34A",    // green-600
      },
    },
  },
  plugins: [],
};
