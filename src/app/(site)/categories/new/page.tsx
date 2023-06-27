'use client';

import React from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

import { Header } from '~/components/Header';
import { FormContent } from './components/FormContent';

const NewCategory = () => {
  const router = useRouter();
  return (
    <>
      <Header>
        <div className="flex items-center justify-center relative">
          <button
            className="absolute left-0 p-3 rounded-lg border"
            onClick={() => router.back()}
          >
            <BiLeftArrowAlt size={20} color="#A0ACB2" />
          </button>

          <span className="text-xl text-gray-400">Adicionar uma categoria</span>
        </div>
      </Header>

      <section className="w-full max-w-[800px] mx-auto py-12">
        <div className="w-full bg-white rounded-2xl border overflow-hidden">
          <div
            className="
              bg-gradient-to-r 
              from-[#F5FFF5] 
              from-0% 
              to-white-alpha-50 
              to-100% 
              py-14 
              pl-16 
              border-b
            "
          >
            <h1 className="text-4xl font-semibold font-barlow text-[#51B853]">
              Adicione uma categoria
            </h1>
          </div>

          <FormContent />
        </div>
      </section>
    </>
  );
};

export default NewCategory;
