'use client';

import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { zodResolver } from '@hookform/resolvers/zod';
import uniqid from 'uniqid';

import { useCityStore } from '~/stores/useCityStore';

import { NewCityForm } from './NewCityForm';
import { NewPlaceForm } from './NewPlaceForm';
import { cityFormValidationSchema } from '~/schemas/newCitySchema';
import { useSuccessfullyModal } from '~/hooks/useSuccessfullyModal';
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

type PlaceData = {
  city_id: number;
  address_id: number;
  category_id: number;
  name: string;
  description: string;
  image_path: string;
};

export const FormContent = ({ categories = [] }: Props) => {
  const currentStep = useCityStore((state) => state.currentStep);
  const goToPreviousStep = useCityStore((state) => state.setCurrentStep);

  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const form = useForm<CityFormData>({
    resolver: zodResolver(cityFormValidationSchema),
    mode: 'onChange',
    defaultValues: {
      cityName: '',
      cityImage: null,
      cityDescription: '',
      placeName: '',
      placeImage: null,
      placeDescription: '',
      categoryId: '',
    },
  });

  const { handleSubmit, reset } = form;

  const { onOpenChange, setDescription, setTitle } = useSuccessfullyModal();

  const sucessfullyModal = React.useCallback(() => {
    setTitle('Perfil cadastrado!');
    setDescription(
      'Você tem uma nova cidade e um novo ponto cadastrado. Continue sempre  adicionando locais incríveis.'
    );
    onOpenChange();
  }, [setTitle, setDescription, onOpenChange]);

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

  const createNewPlace = React.useCallback(
    async (placeData: PlaceData) => {
      const {
        city_id,
        address_id,
        category_id,
        image_path,
        name,
        description,
      } = placeData;

      const { error } = await supabaseClient.from('places').insert({
        city_id,
        address_id,
        category_id,
        image_path,
        name,
        description,
      });

      return { error };
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
          image_path: cityImageData?.path ?? '',
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

        const placeImage: File = data?.placeImage?.[0];

        if (!placeImage) return toast.error('Adicione uma foto do local');

        const placeImagePath = `places/image-place-${uniqueID}`;

        const { data: placeImageData, error: placeImageError } =
          await uploadImage(placeImagePath, placeImage);

        if (placeImageError) return toast.error('Ocorreu um error!');

        const city_id = resolvedCity?.data[0]?.id;
        const address_id = resolvedAddress?.data[0]?.id;

        const placeData: PlaceData = {
          city_id,
          address_id,
          category_id: Number(data?.categoryId),
          name: data?.placeName,
          description: data?.placeDescription,
          image_path: placeImageData?.path ?? '',
        };

        const { error } = await createNewPlace(placeData);

        if (error) return toast.error('Ocorreu um erro!');

        sucessfullyModal();

        reset();

        router.push('/cities');
        goToPreviousStep('01');
      } catch (_) {
        return toast.error('Ocorreu um error!');
      }
    },
    [
      sucessfullyModal,
      uploadImage,
      createNewCity,
      createNewAddress,
      createNewPlace,
      reset,
      router,
      goToPreviousStep,
    ]
  );

  return (
    <div className="w-full">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <NewCityForm className={currentStep === '02' ? 'hidden' : ''} />

          <NewPlaceForm
            className={currentStep === '01' ? 'hidden' : ''}
            categories={categories}
          />
        </form>
      </FormProvider>
    </div>
  );
};
