'use client';

import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCityStore } from '~/stores/useCityStore';

import { NewCityForm } from './NewCityForm';
import { NewLocaleForm } from './NewLocaleForm';
import { cityFormValidationSchema } from '~/schemas/newCitySchema';
import type { Category, CityFormData } from '~/@types/types';

type Props = {
  categories: Category[];
};

export const FormContent = ({ categories = [] }: Props) => {
  const currentStep = useCityStore((state) => state.currentStep);

  const form = useForm<CityFormData>({
    resolver: zodResolver(cityFormValidationSchema),
    mode: 'onChange',
    defaultValues: {
      cityName: '',
      cityImage: null,
      cityDescription: '',
      localeName: '',
      localeImage: null,
      localeDescription: '',
      categoryId: '',
    },
  });

  const { handleSubmit } = form;

  const onSubmit: SubmitHandler<CityFormData> = React.useCallback(
    async (data) => {
      console.log('data', data);
    },
    []
  );

  return (
    <div className="w-full">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <NewCityForm className={currentStep === '02' ? 'hidden' : ''} />

          <NewLocaleForm
            className={currentStep === '01' ? 'hidden' : ''}
            categories={categories}
          />
        </form>
      </FormProvider>
    </div>
  );
};
