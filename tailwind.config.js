/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'manufacturing-blue': '#1e3a8a',
        'manufacturing-blue-dark': '#1e40af',
        'manufacturing-teal': '#10b981',
        'manufacturing-teal-dark': '#059669',
        'manufacturing-orange': '#f59e0b',
        'manufacturing-orange-dark': '#d97706',
      },
    },
  },
  plugins: [],
}
