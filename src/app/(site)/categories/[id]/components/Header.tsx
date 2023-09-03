'use client';

import React from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

import { HeaderContainer } from '~/components/HeaderContainer';

export const HeaderEditCategory = () => {
  const router = useRouter();

  return (
    <HeaderContainer>
      <div className="flex items-center justify-center relative">
        <button
          className="absolute left-0 p-3 rounded-lg border"
          onClick={() => router.back()}
        >
          <BiLeftArrowAlt size={20} color="#A0ACB2" />
        </button>

        <span className="text-xl text-gray-400">Editar</span>
      </div>
    </HeaderContainer>
  );
};
