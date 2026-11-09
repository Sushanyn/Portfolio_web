/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--bg-color) / <alpha-value>)',
        foreground: 'rgb(var(--text-color) / <alpha-value>)',
        accent: {
          DEFAULT: 'rgb(var(--accent-color) / <alpha-value>)',
          light: 'rgb(var(--accent-light) / <alpha-value>)',
        },
        card: 'rgb(var(--card-bg) / <alpha-value>)',
      },
      screens: {
        xs: '420px',
      },
      fontFamily: {
        sans: ['Kanit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

