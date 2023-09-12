'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

import { Button } from '~/components/Button';
import { Alert } from '~/components/Alert';

import { FormHeader } from '../FormHeader';
import { useCityStore } from '~/stores/useCityStore';
import type { Category } from '~/@types/types';

import { LocaleName } from './components/LocaleName';
import { LocaleImage } from './components/LocaleImage';
import { LocaleDescription } from './components/LocaleDescription';
import { LocaleCategory } from './components/LocaleCategory';
import { LocaleAddress } from './components/LocaleAddress';

type Props = {
  className?: string;
  categories: Category[];
};

export const NewLocaleForm = ({ className, categories }: Props) => {
  const goToPreviousStep = useCityStore((state) => state.setCurrentStep);

  const handleGoToPreviousStep = React.useCallback(() => {
    goToPreviousStep('01');

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [goToPreviousStep]);

  return (
    <div className={twMerge(`w-full`, className)}>
      <FormHeader currentStep="02" title="Adicione um local" />

      <div className="py-12 px-16">
        <div className="border-b pb-4">
          <h2 className="text-2xl text-blue-900 font-barlow font-medium">
            Dados básicos
          </h2>
        </div>

        <div className="flex flex-col items-start pt-6 gap-y-6">
          <LocaleName />

          <LocaleImage />

          <LocaleDescription />

          <LocaleCategory categories={categories} />

          <LocaleAddress />
        </div>

        <div className="flex items-center justify-between">
          <Alert />

          <div className="flex items-center justify-center gap-2">
            <Button
              type="button"
              className="bg-blue-500 font-semibold hover:bg-blue-900"
              onClick={handleGoToPreviousStep}
            >
              Voltar
            </Button>

            <Button
              type="submit"
              className="bg-green-500 font-semibold hover:bg-green-600"
            >
              Concluir cadastro
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
