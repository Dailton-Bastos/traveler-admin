import './globals.css';
import { Heebo } from 'next/font/google';

const font = Heebo({ subsets: ['latin'] });

export const metadata = {
  title: 'Traveler',
  description: 'Cadastre e gerencie cidades',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
