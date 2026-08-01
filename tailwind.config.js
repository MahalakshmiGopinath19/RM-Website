/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-jakarta)', 'Inter', 'sans-serif'],
        display: ['var(--font-outfit)', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        spinSlow: 'spinSlow 18s linear infinite',
      },
      colors: {
        darkBg: '#0D0D2B',
        darkPanel: '#14143a',
        peachAccent: '#C9956C',
        peachDark: '#a1724a',
        electricCyan: '#00D4FF',
        deepIndigo: '#3D2B8E',
        ivoryWhite: '#FAF8F4',
        mutedText: '#acabcb',
        navy: {
          950: '#0D0D2B', // Cosmic Navy
          900: '#14143a', // base navy
          800: '#3D2B8E', // Deep Indigo
          DEFAULT: '#0D0D2B',
        },
        copper: {
          300: '#FAF8F4', // Ivory White
          400: '#CD8E83', // rose gold
          500: '#C9956C', // Rose Gold
          600: '#a1724a', // deep rose gold
          DEFAULT: '#C9956C',
        },
        teal: {
          400: '#00D4FF', // Electric Cyan
          DEFAULT: '#00D4FF',
        },
        cream: {
          50: '#FAF8F4',
          DEFAULT: '#FAF8F4',
        },
        // Re-route red classes to match the new Vaave Digital copper palette
        red: {
          50: '#FAF8F4',
          100: '#EFD3C9',
          200: '#EFD3C9',
          300: '#CD8E83',
          400: '#C9956C',
          500: '#C9956C',
          600: '#a1724a',
          700: '#a1724a',
          800: '#7E4424',
          900: '#5D2D14',
        }
      }
    },
  },
  plugins: [],
};
