'use client';

import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { zodResolver } from '@hookform/resolvers/zod';
import uniqid from 'uniqid';

import { useCityStore } from '~/stores/useCityStore';

import { NewCityForm } from './NewCityForm';
import { NewLocaleForm } from './NewLocaleForm';
import { cityFormValidationSchema } from '~/schemas/newCitySchema';
import type { Category, CityFormData } from '~/@types/types';

type Props = {
  categories: Category[];
};

type CityData = {
  name: string;
  description: string;
  image_path: string;
};

type AddressData = {
  postal_code: string;
  street: string;
  neighborhood: string;
  number: string;
  complement?: string;
};

export const FormContent = ({ categories = [] }: Props) => {
  const currentStep = useCityStore((state) => state.currentStep);

  const supabaseClient = useSupabaseClient();

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

  const uploadImage = React.useCallback(
    async (path: string, fileBody: File) => {
      const { data, error } = await supabaseClient.storage
        .from('images')
        .upload(path, fileBody, {
          cacheControl: '3600',
          upsert: false,
        });

      return { data, error };
    },
    [supabaseClient]
  );

  const createNewCity = React.useCallback(
    async (cityData: CityData) => {
      const { image_path, name, description } = cityData;

      const { data, error } = await supabaseClient
        .from('cities')
        .insert({
          image_path,
          name,
          description,
        })
        .select();

      return { data, error };
    },
    [supabaseClient]
  );

  const createNewAddress = React.useCallback(
    async (addressData: AddressData) => {
      const { postal_code, street, neighborhood, number, complement } =
        addressData;

      const { data, error } = await supabaseClient
        .from('addresses')
        .insert({
          postal_code,
          street,
          neighborhood,
          number,
          complement,
        })
        .select();

      return { data, error };
    },
    [supabaseClient]
  );

  const onSubmit: SubmitHandler<CityFormData> = React.useCallback(
    async (data) => {
      try {
        const cityImage: File = data?.cityImage?.[0];

        if (!cityImage) return toast.error('Adicione uma foto da cidade');

        const uniqueID = uniqid();

        const cityImagePath = `cities/image-city-${uniqueID}`;

        const { data: cityImageData, error: cityImageError } =
          await uploadImage(cityImagePath, cityImage);

        if (cityImageError) return toast.error('Ocorreu um error!');

        const dataCity = {
          name: data?.cityName,
          image_path: cityImageData?.path as string,
          description: data?.cityDescription,
        };

        const dataAddress = {
          ...data?.address,
          postal_code: data?.address?.zipCode,
        };

        const promiseCity = createNewCity(dataCity);

        const promiseAddress = createNewAddress(dataAddress);

        const [resolvedCity, resolvedAddress] = await Promise.all([
          promiseCity,
          promiseAddress,
        ]);

        if (resolvedCity?.error)
          return toast.error(resolvedCity?.error?.message);

        if (resolvedAddress?.error)
          return toast.error(resolvedAddress?.error?.message);

        if (!resolvedCity?.data) return;
        if (!resolvedAddress?.data) return;

        // const cityId = resolvedCity?.data[0]?.id;
        // const addressId = resolvedAddress?.data[0]?.id;
      } catch (_) {
        return toast.error('Ocorreu um error!');
      }
    },
    [uploadImage, createNewCity, createNewAddress]
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
