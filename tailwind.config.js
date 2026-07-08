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
          950: '#050821', // Darkest background navy from logo
          900: '#0A0930', // base navy
          800: '#0C4573', // medium navy from palette
          DEFAULT: '#050821',
        },
        copper: {
          300: '#EFD3C9', // light peach/cream from palette
          400: '#CD8E83', // rose gold from palette
          500: '#E0A36A', // main copper from palette
          600: '#9C5B5A', // deep rose gold/brown from palette
          DEFAULT: '#E0A36A',
        },
        teal: {
          400: '#E0A36A', // electric cyan glow from logo
          DEFAULT: '#E0A36A',
        },
        cream: {
          50: '#FDFBF8',
          DEFAULT: '#FDFBF8',
        },
        // Re-route red classes to match the new Vaave Digital copper palette
        red: {
          50: '#FDFBF8',
          100: '#EFD3C9',
          200: '#EFD3C9',
          300: '#CD8E83',
          400: '#E0A36A',
          500: '#E0A36A',
          600: '#9C5B5A',
          700: '#9C5B5A',
          800: '#7E4424',
          900: '#5D2D14',
        }
      }
    },
  },
  plugins: [],
};
