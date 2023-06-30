'use client';

import React from 'react';

import { Logo } from './Logo';

export const Loading = () => {
  return (
    <div
      className="
        h-full
        w-full
        flex
        items-center
        justify-center
        bg-orange-600
      "
    >
      <Logo className="animate-float" />
    </div>
  );
};
