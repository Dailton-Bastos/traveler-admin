'use client';

import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import { useRouter } from 'next/navigation';

interface AuthContentProps {
  children: React.ReactNode;
}

export const AuthContent = ({ children }: AuthContentProps) => {
  const router = useRouter();

  return (
    <div className="h-full w-full max-w-[416px]">
      <button className="cursor-pointer">
        <FiArrowLeft size={24} color="#A0ACB2" onClick={() => router.back()} />
      </button>

      <div className="flex items-center justify-center h-full w-full">
        {children}
      </div>
    </div>
  );
};
