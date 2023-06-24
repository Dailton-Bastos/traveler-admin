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
      },
    },
  },
  plugins: [],
};
