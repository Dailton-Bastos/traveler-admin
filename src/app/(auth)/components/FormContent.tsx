'use client';

import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import Link from 'next/link';

import { Input } from './Input';
import { InputPassword } from './InputPassword';
import { InputCheckbox } from './InputCheckbox';

export const FormContent = () => {
  return (
    <form className="flex flex-col w-full mt-11">
      <div
        className="
          flex
          flex-col
          rounded-lg
        bg-white
          border
        border-gray-300
          overflow-hidden
          divide-y
          divide-gray-300
        "
      >
        <Input id="email" label="E-mail" />

        <InputPassword id="password" label="Senha" />
      </div>

      <div
        className="
          flex
          items-center
          justify-between
          mt-6
          mb-8
          w-full
        "
      >
        <InputCheckbox />

        <Link
          href="/forgot"
          className="
            text-[#A0ACB2]
            hover:text-neutral-500
            transition
          "
        >
          Esqueci minha senha
        </Link>
      </div>

      <button
        type="submit"
        disabled
        className="
          text-white
          bg-[#F25D27]
          cursor-pointer
          rounded-lg
          text-lg
          font-medium
          disabled:opacity-50
          disabled:cursor-not-allowed
          hover:bg-orange-600
          transition
          h-[72px]
        "
      >
        Acessar plataforma
      </button>

      <div
        className="
          flex
          items-center
          justify-start
          gap-x-7
          mt-20
        "
      >
        <FiAlertCircle size={32} color="#F25D27" />

        <p
          className="
            text-[#617480]
            text-sm
          "
        >
          Acesso restrito à<br />
          sócios e moderadores
        </p>
      </div>
    </form>
  );
};
