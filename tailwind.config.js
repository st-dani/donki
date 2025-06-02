/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'theme-white': '#ffffff',
        'theme-black': '#000000',
        'theme-yellow': {
          DEFAULT: '#FFD700',
          light: '#FFE44D',
          dark: '#CCAC00',
        },
        'theme-red': {
          DEFAULT: '#FF0000',
          light: '#FF3333',
          dark: '#CC0000',
        },
      },
    },
  },
  plugins: [],
} 