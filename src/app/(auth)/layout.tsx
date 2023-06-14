import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: 'Login | Traveler',
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <section>{children}</section>;
};

export default AuthLayout;
