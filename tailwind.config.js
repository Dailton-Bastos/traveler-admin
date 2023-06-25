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
        'blue-900': '#123952',
        'green-500': '#51B853',
        'white-alpha-700': 'rgba(var(--white-alpha-700), 0.70)',
      },
    },
  },
  plugins: [],
};
