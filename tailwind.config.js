/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'desktop-screen': '1280px',
      'max-desktop': { max: '1279px' },
    },
    extend: {
      fontFamily: {
        figtree: ['var(--figtree)', 'sans-serif', 'system-ui'],
        inter: ['var(--inter)', 'ui-monospace'],
      },

      colors: {
        customGray: {
          light: '#2e3039',
          base: '#eeeeee',
          dark: '#1f2028',
        },
      },
    },
  },
  darkMode: 'class',
};
