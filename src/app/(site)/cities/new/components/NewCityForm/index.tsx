'use client';

import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import type { FieldErrors, UseFormSetValue } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { Button } from '~/components/Button';
import { Alert } from '~/components/Alert';
import { useCityStore } from '~/stores/useCityStore';

import { FormHeader } from '../FormHeader';
import { CityName } from './components/CityName';
import { CityImage } from './components/CityImage';
import { CityDescription } from './components/CityDescription';
import type { CityFormData } from '~/@types/types';

type Props = {
  isDisabled: boolean;
  errors: FieldErrors<CityFormData>;
  register: UseFormRegister<CityFormData>;
  className?: string;
  setValue: UseFormSetValue<CityFormData>;
};

export const NewCityForm = (props: Props) => {
  const { isDisabled, errors, register, className, setValue } = props;

  const goToNextStep = useCityStore((state) => state.setCurrentStep);

  const formsErrors = React.useMemo(
    () => ({
      name: {
        hasError: Boolean(errors?.cityName),
        message: errors?.cityName?.message?.toString() ?? '',
      },

      image: {
        hasError: Boolean(errors?.cityImage),
        message: errors?.cityImage?.message?.toString() ?? '',
      },

      description: {
        hasError: Boolean(errors?.cityDescription),
        message: errors?.cityDescription?.message?.toString() ?? '',
      },
    }),
    [errors]
  );

  const handleGoToNextStep = React.useCallback(() => {
    goToNextStep('02');

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [goToNextStep]);

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
          <CityName
            register={register}
            isDisabled={isDisabled}
            hasError={formsErrors?.name?.hasError}
            errorMessage={formsErrors?.name?.message}
          />

          <CityImage
            isDisabled={isDisabled}
            hasError={formsErrors?.image?.hasError}
            errorMessage={formsErrors?.image?.message}
          />

          <CityDescription
            setValue={setValue}
            hasError={formsErrors?.description?.hasError}
            errorMessage={formsErrors?.description?.message}
          />
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
