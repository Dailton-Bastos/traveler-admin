'use client';

import React from 'react';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { RxDashboard } from 'react-icons/rx';
import { BiComment } from 'react-icons/bi';

import { Box } from './Box';
import { Logo } from './Logo';
import { Logout } from './Logout';
import { SidebarItem } from './SidebarItem';

interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => {
  const routes = React.useMemo(
    () => [
      {
        icon: HiOutlineLocationMarker,
        label: 'Listagem de cidades',
        href: '/cities',
      },
      {
        icon: RxDashboard,
        label: 'Listagem de categorias',
        href: '/categories',
      },
      {
        icon: BiComment,
        label: 'Listagem de depoimentos',
        href: '/testimonials',
      },
    ],
    []
  );
  return (
    <div className="flex h-full">
      <div
        className="
          flex
          flex-col
          justify-between
          py-6
          px-8
          bg-orange-600
          h-full
          w-[96px]"
      >
        <Box>
          <Logo />
        </Box>

        <Box>
          <div className="flex flex-col gap-y-10">
            {routes?.map((route) => (
              <SidebarItem key={route?.href} {...route} />
            ))}
          </div>
        </Box>

        <Box>
          <Logout />
        </Box>
      </div>

      <main className="w-full h-full">{children}</main>
    </div>
  );
};
