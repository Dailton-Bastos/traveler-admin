import './globals.css';

import { heebo, barlow, roboto } from './fonts';
import { ToasterProvider } from '~/providers/ToasterProvider';
import { SupabaseProvider } from '~/context/SupabaseContext';
import { UserProvider } from '~/context/UserContext';
import { ModalProvider } from '~/providers/ModalProvider';

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

        <SupabaseProvider>
          <ModalProvider />
          <UserProvider>{children}</UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
