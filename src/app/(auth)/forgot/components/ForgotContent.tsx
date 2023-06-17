'use client';

import React from 'react';

import Link from 'next/link';

import { Input } from '../../components/Input';

export const ForgotContent = () => {
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
      </div>

      <div
        className="
          flex
          items-center
          justify-end
          mt-6
          mb-8
          w-full
        "
      >
        <Link
          href="/"
          className="
            text-[#A0ACB2]
            hover:text-neutral-500
            transition
          "
        >
          Voltar para login
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
        Recuperar
      </button>
    </form>
  );
};
