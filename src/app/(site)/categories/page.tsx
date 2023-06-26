'use client';

import React from 'react';
import { FiPlus, FiAlertCircle } from 'react-icons/fi';

import { useRouter } from 'next/navigation';

import { Button } from '~/components/Button';
import { Category } from '~/components/Category';
import { Header } from '~/components/Header';

const Categories = () => {
  const router = useRouter();

  return (
    <>
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

          <Button onClick={() => router.push('/categories/new')}>
            <div className="flex items-center gap-x-1">
              <FiPlus color="#fff" />
              Adicionar uma categoria
            </div>
          </Button>
        </div>
      </Header>

      <section className="w-full max-w-[1120px] mx-auto py-12">
        <div className="grid grid-cols-3 gap-x-8">
          <Category />
          <Category />
          <Category />
        </div>
      </section>
    </>
  );
};

export default Categories;
