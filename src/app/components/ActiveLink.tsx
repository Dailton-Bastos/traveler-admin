'use client';

import React from 'react';

import { usePathname } from 'next/navigation';
import Link, { LinkProps } from 'next/link';
import { twMerge } from 'tailwind-merge';

interface ActiveLinkProps extends LinkProps {
  children: React.ReactElement;
  shouldMatchExactHref?: boolean;
}

export const ActiveLink = ({
  children,
  shouldMatchExactHref = false,
  ...props
}: ActiveLinkProps) => {
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
      className={twMerge(
        `
        opacity-50
        hover:opacity-100
        transition`,
        isActiveLink && 'opacity-100'
      )}
    >
      {children}
    </Link>
  );
};
