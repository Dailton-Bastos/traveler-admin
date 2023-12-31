/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heebo: ['var(--font-heebo)'],
        barlow: ['var(--font-barlow)'],
        roboto: ['var(--font-roboto)'],
      },
      colors: {
        'orange-600': '#F25D27',
        'blue-500': '#115D8C',
        'blue-900': '#123952',
        'green-500': '#51B853',
        'gray-50': '#F5F8FA',
        'gray-100': '#DCE2E5',
        'gray-200': '#A0ACB2',
        'gray-500': '#617480',
        'white-alpha-700': 'rgba(var(--white-alpha-700), 0.70)',
        'white-alpha-50': 'rgba(var(--white-alpha-50), 0.00)',
      },
      keyframes: {
        float: {
          '0%': {
            transform: 'translatey(0)',
          },
          '50%': {
            transform: 'translatey(-20px)',
          },
          '100%': {
            transform: 'translatey(0)',
          },
        },
        shake: {
          '0%': {
            marginLeft: '0',
          },
          '25%': {
            marginLeft: '0.5rem',
          },
          '75%': {
            marginLeft: '-0.5rem',
          },
          '100%': {
            marginLeft: '0',
          },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shake: 'shake 0.2s ease-in-out 0s 2',
      },
    },
  },
  plugins: [],
};
