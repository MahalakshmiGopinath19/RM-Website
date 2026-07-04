/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0A0930',
          900: '#12103D',
          800: '#1B1854',
          DEFAULT: '#0A0930',
        },
        copper: {
          300: '#F0C9A0',
          400: '#E3AD7C',
          500: '#D18F5C',
          600: '#B8714A',
          DEFAULT: '#D18F5C',
        },
        teal: {
          400: '#34D2C7',
          DEFAULT: '#34D2C7',
        },
        cream: {
          50: '#FDFBF8',
          DEFAULT: '#FDFBF8',
        },
        // Re-route red classes to match the new Vaave Digital copper palette
        red: {
          50: '#FDFBF8',
          100: '#FBEFE7',
          200: '#F0C9A0',
          300: '#E3AD7C',
          400: '#D18F5C',
          500: '#D18F5C',
          600: '#B8714A',
          700: '#9E5C38',
          800: '#7E4424',
          900: '#5D2D14',
        }
      }
    },
  },
  plugins: [],
};