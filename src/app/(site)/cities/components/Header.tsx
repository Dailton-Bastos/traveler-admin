'use client';
import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

import { Button } from '~/components/Button';

export const HeaderCities = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push('/cities/new')}>
      <div className="flex items-center gap-x-1">
        <FiPlus color="#fff" />
        Adicionar um perfil
      </div>
    </Button>
  );
};
