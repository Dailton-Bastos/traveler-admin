import './globals.css';

import { heebo, barlow, roboto } from './fonts';
import { ToasterProvider } from '~/providers/ToasterProvider';

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
    <html
      lang="en"
      className={`${heebo.variable} ${barlow.variable} ${roboto.variable}`}
    >
      <body className="font-heebo">
        <ToasterProvider />

        {children}
      </body>
    </html>
  );
}
