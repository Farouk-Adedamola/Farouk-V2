/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      'max-md': { max: '767px' },
      'max-desktop': { max: '1279px' },
    },
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      // Mirrors the tokens in src/styles/globals.css so utilities and the
      // stylesheet cannot drift apart.
      colors: {
        ink: {
          DEFAULT: '#08080A',
          raised: '#101014',
          deep: '#050507',
        },
        paper: '#F2F2F5',
        body: '#C0C0C8',
        mute: {
          DEFAULT: '#8C8C96',
          dim: '#56565F',
        },
        accent: {
          DEFAULT: '#FFA62B',
          ink: '#14100A',
        },
      },
      maxWidth: {
        shell: '1180px',
      },
    },
  },
  plugins: [],
};
