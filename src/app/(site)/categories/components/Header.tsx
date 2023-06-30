'use client';

import React from 'react';
import { Header } from '~/components/Header';
import { FiPlus, FiAlertCircle } from 'react-icons/fi';

import { useRouter } from 'next/navigation';

import { Button } from '~/components/Button';

interface HeaderCategoryProps {
  totalCategories: number;
}

export const HeaderCategory = ({ totalCategories }: HeaderCategoryProps) => {
  const router = useRouter();

  const disabled = totalCategories >= 3;

  return (
    <Header>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-semibold font-barlow text-blue-900">
          Categorias
        </h1>

        <div className="flex items-center gap-x-3">
          <FiAlertCircle color="#A0ACB2" size={20} />

          <span className="text-sm text-gray-400">
            Você pode adicionar apenas três
          </span>
        </div>

        <Button
          onClick={() => router.push('/categories/new')}
          disabled={disabled}
        >
          <div className="flex items-center gap-x-1">
            <FiPlus color="#fff" />
            Adicionar uma categoria
          </div>
        </Button>
      </div>
    </Header>
  );
};
