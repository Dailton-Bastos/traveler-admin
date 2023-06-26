'use client';

import React from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { FiAlertCircle, FiPlus } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

import { Header } from '~/components/Header';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { FileInput } from '~/components/FileInput';

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

          <form className="py-12 px-16">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-semibold text-blue-900 font-barlow">
                Dados
              </h2>
            </div>

            <div className="flex items-center justify-start pt-6 pb-12 gap-x-10">
              <div className="w-fit h-fit">
                <span className="text-gray-500 text-sm">Ícone</span>

                <div className="w-[120px] h-[120px] overflow-hidden mt-2">
                  <FileInput className="w-[120px] h-[120px]">
                    <FiPlus size={14} color="#F25D27" />
                  </FileInput>
                </div>
              </div>

              <Input id="name" label="Nome da categoria" />
            </div>

            <div className="flex items-center justify-between">
              <div
                className="
                  flex
                  items-center
                  justify-start
                  gap-x-7
                "
              >
                <FiAlertCircle size={32} color="#F25D27" />

                <p
                  className="
                  text-[#617480]
                    text-sm
                  "
                >
                  Preencha todos os <br />
                  dados com cuidado.
                </p>
              </div>

              <Button type="submit">Concluir cadastro</Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default NewCategory;
