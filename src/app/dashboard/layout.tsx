import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: 'Dashboard | Traveler',
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return <section>{children}</section>;
};

export default DashboardLayout;
