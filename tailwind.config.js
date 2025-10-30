/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Corrected: Removed 'src/'
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Corrected: Removed 'src/'
    // Removed './src/pages/...' as you are using the App Router ('./app/...')
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}