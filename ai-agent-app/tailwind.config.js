/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0d1b2a',
        deepBlue: '#1b263b',
      },
      backgroundImage: {
        'app-gradient': 'linear-gradient(135deg, #0d1b2a, #1b263b)',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}


