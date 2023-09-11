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
  const [isLoading, setIsLoading] = React.useState(false);

  const isDisabled = isLoading;

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

  const { register, formState, handleSubmit, setValue } = form;

  const { errors } = formState;

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
            isDisabled={isDisabled}
            errors={errors}
            register={register}
            className={currentStep === '01' ? 'hidden' : ''}
            setValue={setValue}
            categories={categories}
          />
        </form>
      </FormProvider>
    </div>
  );
};
