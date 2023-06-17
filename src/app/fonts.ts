import { Heebo, Barlow, Roboto } from 'next/font/google';

export const heebo = Heebo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heebo',
  weight: ['400'],
});

export const barlow = Barlow({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-barlow',
  weight: ['600', '400'],
});

export const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  weight: ['400'],
});
