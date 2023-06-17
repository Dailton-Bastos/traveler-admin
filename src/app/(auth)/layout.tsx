import React from 'react';

import Image from 'next/image';
import { AuthContent } from './components/AuthContent';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: 'Login | Traveler',
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <section
      className="
        flex
        items-center
        justify-center
        h-full
        w-full
      "
    >
      <div
        className="
          grid
          grid-cols-2
        "
      >
        <Image src="/images/hero.jpg" alt="" width={798} height={820} />

        <div className="py-10 px-40">
          <AuthContent>{children}</AuthContent>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
