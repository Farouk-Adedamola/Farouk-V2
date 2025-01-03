/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'max-desktop': { max: '1279px' },
      sm: '640px',
      'max-md': { max: '767px' },
      md: '768px',

      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        figtree: ['var(--figtree)', 'sans-serif', 'system-ui'],
        inter: ['var(--inter)', 'ui-monospace'],
      },
      colors: {
        error: '#ef4444',
        'emerald-light': '#34d399',
        'emerald-deep': '#10b981',
        'light-primary': '#64748B',

        lightTheme: {
          primary: '#ebebeb',
          secondary: '#dadada',
          text: '#f3f4f6',
        },
        darkTheme: {
          primary: '#030712',
          'primary-dark': '#0f1729',
          secondary: '#1f2937',
        },
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
