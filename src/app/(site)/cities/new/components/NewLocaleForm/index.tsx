'use client';

import React from 'react';
import type { FieldErrors, UseFormSetValue } from 'react-hook-form';
import { UseFormRegister } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { Button } from '~/components/Button';
import { Alert } from '~/components/Alert';

import { FormHeader } from '../FormHeader';
import { useCityStore } from '~/stores/useCityStore';
import type { Category, CityFormData } from '~/@types/types';

import { LocaleName } from './components/LocaleName';
import { LocaleImage } from './components/LocaleImage';
import { LocaleDescription } from './components/LocaleDescription';
import { LocaleCategory } from './components/LocaleCategory';
import { LocaleAddress } from './components/LocaleAddress';

type Props = {
  isDisabled: boolean;
  errors: FieldErrors<CityFormData>;
  register: UseFormRegister<CityFormData>;
  className?: string;
  setValue: UseFormSetValue<CityFormData>;
  categories: Category[];
};

export const NewLocaleForm = (props: Props) => {
  const { isDisabled, errors, register, className, setValue, categories } =
    props;

  const goToPreviousStep = useCityStore((state) => state.setCurrentStep);

  const formsErrors = React.useMemo(
    () => ({
      name: {
        hasError: Boolean(errors?.localeName),
        message: errors?.localeName?.message?.toString() ?? '',
      },

      image: {
        hasError: Boolean(errors?.localeImage),
        message: errors?.localeImage?.message?.toString() ?? '',
      },

      description: {
        hasError: Boolean(errors?.localeDescription),
        message: errors?.localeDescription?.message?.toString() ?? '',
      },

      category: {
        hasError: Boolean(errors?.categoryId),
        message: errors?.categoryId?.message?.toString() ?? '',
      },
    }),
    [errors]
  );

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
          <LocaleName
            register={register}
            isDisabled={isDisabled}
            hasError={formsErrors?.name?.hasError}
            errorMessage={formsErrors?.name?.message}
          />

          <LocaleImage
            isDisabled={isDisabled}
            hasError={formsErrors?.image?.hasError}
            errorMessage={formsErrors?.image?.message}
          />

          <LocaleDescription
            setValue={setValue}
            hasError={formsErrors?.description?.hasError}
            errorMessage={formsErrors?.description?.message}
          />

          <LocaleCategory
            setValue={setValue}
            hasError={formsErrors?.category?.hasError}
            errorMessage={formsErrors?.category?.message}
            categories={categories}
          />

          <LocaleAddress
            register={register}
            setValue={setValue}
            isDisabled={isDisabled}
            errors={errors}
          />
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
