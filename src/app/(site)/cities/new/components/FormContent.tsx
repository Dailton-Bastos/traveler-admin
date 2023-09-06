'use client';

import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import { useCityStore } from '~/stores/useCityStore';

import { NewCityForm } from './NewCityForm';
import { NewLocaleForm } from './NewLocaleForm';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const cityFormValidationSchema = zod.object({
  name: zod
    .string({
      required_error: 'Nome obrigatório',
    })
    .min(3, { message: 'Mínimo 3 caracteres' }),

  image: zod
    .any()
    .refine((files) => files?.length == 1, 'Ícone obrigatório')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Tamanho máximo de 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Apenas JPEG, JPG e PNG'
    ),
});

export type CityFormData = zod.infer<typeof cityFormValidationSchema>;

export const FormContent = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const isDisabled = isLoading;

  const currentStep = useCityStore((state) => state.currentStep);

  const form = useForm<CityFormData>({
    resolver: zodResolver(cityFormValidationSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      image: null,
    },
  });

  const { register, formState, handleSubmit, reset } = form;

  const { errors } = formState;

  const onSubmit: SubmitHandler<CityFormData> = React.useCallback(
    async (data) => {
      console.log('data', data);
    },
    []
  );

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          {currentStep === '01' ? (
            <NewCityForm
              isDisabled={isDisabled}
              errors={errors}
              register={register}
            />
          ) : (
            <NewLocaleForm
              isDisabled={isDisabled}
              errors={errors}
              register={register}
            />
          )}
        </FormProvider>
      </form>
    </div>
  );
};
