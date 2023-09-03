'use client';

import React from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

import { HeaderContainer } from '~/components/HeaderContainer';
import { twMerge } from 'tailwind-merge';

export const HeaderNewCity = () => {
  const [currentStep, setCurrentStep] = React.useState('01');

  const router = useRouter();

  return (
    <HeaderContainer>
      <div className="flex items-center justify-between">
        <button
          className=" p-3 rounded-lg border"
          onClick={() => router.back()}
        >
          <BiLeftArrowAlt size={20} color="#A0ACB2" />
        </button>

        <span className="text-xl text-gray-400">Adicionar um perfil</span>

        <div className="flex items-center justify-between gap-x-1.5">
          <span
            className={twMerge(
              `
              text-xs font-normal text-gray-200 font-roboto
            `,
              currentStep === '01' && 'font-bold text-gray-400'
            )}
          >
            01
          </span>

          <div className="text-gray-200">-</div>

          <span
            className={twMerge(
              `
              text-xs font-normal text-gray-200 font-roboto
            `,
              currentStep === '02' && 'font-bold text-gray-400'
            )}
          >
            02
          </span>
        </div>
      </div>
    </HeaderContainer>
  );
};
