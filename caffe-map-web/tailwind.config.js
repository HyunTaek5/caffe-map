/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'main-1': '#627070',
        'header-1': '#FAFAFA'
      },
      screens: {
        'tablet': '945px'
      },
      fontFamily: {
        sans: ['Pretendard', ...defaultTheme.fontFamily.sans],
        montserrat: ['Montserrat'],
        tinos: ['Tinos']
      },
      variants: {
        extend: {
          backgroundColor: ['disabled'],
          borderColor: ['disabled'],
          textColor: ['disabled']
        }
      }
    }
  },
  plugins: []
};
