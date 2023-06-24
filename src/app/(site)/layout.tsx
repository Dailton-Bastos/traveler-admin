import React from 'react';
import { Sidebar } from '~/components/Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: 'Dashboard | Traveler',
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return <Sidebar>{children}</Sidebar>;
};
export default DashboardLayout;
