'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';

import { Button } from '~/components/Button';
import { Alert } from '~/components/Alert';
import { useCityStore } from '~/stores/useCityStore';

import { FormHeader } from '../FormHeader';
import { CityName } from './components/CityName';
import { CityImage } from './components/CityImage';
import { CityDescription } from './components/CityDescription';
import { CityFormData } from '~/@types/types';

type Props = {
  className?: string;
  handleChangeStep: (step: '01' | '02') => void;
};

export const NewCityForm = ({ className, handleChangeStep }: Props) => {
  const { getValues } = useFormContext<CityFormData>();

  const cityValues = getValues(['cityName', 'cityDescription', 'cityImage']);

  const disableNextStepButton = cityValues?.some((value) => {
    if (typeof value === 'string') {
      return !value?.trim() === true;
    }

    return !value === true;
  });

  const handleGoToNextStep = React.useCallback(() => {
    if (disableNextStepButton) {
      return toast.error('Preencha os campos acima');
    }

    handleChangeStep('02');
  }, [handleChangeStep, disableNextStepButton]);

  return (
    <div className={twMerge(`w-full`, className)}>
      <FormHeader currentStep="01" title="Adicione uma cidade" />

      <div className="py-12 px-16">
        <div className="border-b pb-4">
          <h2 className="text-2xl text-blue-900 font-barlow font-medium">
            Dados da cidade
          </h2>
        </div>

        <div className="flex flex-col items-start pt-6 pb-12 gap-y-6">
          <CityName />

          <CityImage />

          <CityDescription />
        </div>

        <div className="flex items-center justify-between">
          <Alert />

          <Button
            type="button"
            className="bg-blue-500 font-semibold hover:bg-blue-900"
            onClick={handleGoToNextStep}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
};
