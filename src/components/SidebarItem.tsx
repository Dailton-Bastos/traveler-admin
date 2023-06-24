'use client';

import React from 'react';
import { IconType } from 'react-icons';

import { usePathname } from 'next/navigation';
import Link, { LinkProps } from 'next/link';
import { twMerge } from 'tailwind-merge';

interface SidebarItemProps extends LinkProps {
  icon: IconType;
  label?: string;
  shouldMatchExactHref?: boolean;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  shouldMatchExactHref = false,
  ...props
}: SidebarItemProps) => {
  const pathname = usePathname();

  let isActiveLink =
    shouldMatchExactHref && (pathname === props.href || pathname === props.as);

  if (
    !shouldMatchExactHref &&
    (pathname?.startsWith(String(props.href)) ||
      pathname?.startsWith(String(props.as)))
  ) {
    isActiveLink = true;
  }
  return (
    <Link
      {...props}
      aria-label={label}
      className={twMerge(
        `
        text-white
        opacity-50
        hover:opacity-100
        transition`,
        isActiveLink && 'opacity-100'
      )}
    >
      <Icon size={24} />
    </Link>
  );
};
