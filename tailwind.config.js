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
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'fade-in-delayed': 'fade-in 0.8s ease-out 0.2s forwards',
        'slide': 'slide 30s linear infinite',
        'slide-reverse': 'slide 30s linear infinite reverse'
      }
    },
  },
  plugins: [],
} 