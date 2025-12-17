/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // extend: {
    //   colors: {
    //     // Define custom colors for form inputs
    //     "form-input": {
    //       DEFAULT: "#FFFFFF", // Light mode background color
    //       dark: "#1F2937", // Dark mode background color (e.g., slate-800)
    //     },
    //   },
    // },
  },
  darkMode: 'class',
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
