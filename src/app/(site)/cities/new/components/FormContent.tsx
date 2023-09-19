'use client';

import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { zodResolver } from '@hookform/resolvers/zod';
import uniqid from 'uniqid';

import { useCityStore } from '~/stores/useCityStore';

import { NewCityForm } from './NewCityForm';
import { NewPlaceForm } from './NewPlaceForm';
import { cityFormValidationSchema } from '~/schemas/newCitySchema';
import type {
  AddressData,
  Category,
  CityData,
  CityFormData,
  PlaceData,
} from '~/@types/types';
import { Alert } from '~/components/Alert';
import { Button } from '~/components/Button';
import { RotatingLines } from 'react-loader-spinner';
import { SubmitSuccessfullyModal } from './SubmitSuccessfullyModal';

type Props = {
  categories: Category[];
};

export const FormContent = ({ categories = [] }: Props) => {
  const [showSuccessfullyModal, setShowSucessfullyModal] =
    React.useState(false);
  const currentStep = useCityStore((state) => state.currentStep);
  const changeCurrentStep = useCityStore((state) => state.setCurrentStep);

  const supabaseClient = useSupabaseClient();

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

  const { handleSubmit, reset, formState } = form;

  const { isSubmitting } = formState;

  const handleChangeStep = React.useCallback(
    (step: '01' | '02') => {
      changeCurrentStep(step);

      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    },
    [changeCurrentStep]
  );

  const onCloseSucessfullyModal = React.useCallback(() => {
    setShowSucessfullyModal(false);
  }, []);

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
      const { data, error } = await supabaseClient
        .from('cities')
        .insert(cityData)
        .select();

      return { data, error };
    },
    [supabaseClient]
  );

  const createNewAddress = React.useCallback(
    async (addressData: AddressData) => {
      const { data, error } = await supabaseClient
        .from('addresses')
        .insert(addressData)
        .select();

      return { data, error };
    },
    [supabaseClient]
  );

  const createNewPlace = React.useCallback(
    async (placeData: PlaceData) => {
      const { error } = await supabaseClient.from('places').insert(placeData);

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

        if (cityImageError) return toast.error('Error ao salvar imagem!');

        const dataCity = {
          name: data?.cityName,
          image_path: cityImageData?.path ?? '',
          description: data?.cityDescription,
        };

        const dataAddress: AddressData = {
          street: data?.address?.street,
          neighborhood: data?.address?.neighborhood,
          number: data?.address?.number,
          complement: data?.address?.complement,
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

        if (placeImageError) return toast.error('Error ao salvar imagem!');

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

        if (error) return toast.error('Error ao salvar local!');

        setShowSucessfullyModal(true);

        reset();

        changeCurrentStep('01');
      } catch (_) {
        return toast.error('Ocorreu um error!');
      }
    },
    [
      uploadImage,
      createNewCity,
      createNewAddress,
      createNewPlace,
      reset,
      changeCurrentStep,
    ]
  );

  return (
    <div className="w-full">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <NewCityForm
            className={currentStep === '02' ? 'hidden' : ''}
            handleChangeStep={handleChangeStep}
          />

          <NewPlaceForm
            className={currentStep === '01' ? 'hidden' : ''}
            categories={categories}
          />

          {currentStep === '02' && (
            <div className="flex items-center justify-between px-16 py-12">
              <Alert />

              <div className="flex items-center justify-center gap-2">
                <Button
                  type="button"
                  disabled={isSubmitting}
                  className="bg-blue-500 font-semibold hover:bg-blue-900"
                  onClick={() => handleChangeStep('01')}
                >
                  Voltar
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-500 font-semibold hover:bg-green-600"
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      gap-4
                    "
                  >
                    <RotatingLines
                      strokeColor="#fff"
                      strokeWidth="3"
                      animationDuration="0.95"
                      width="30"
                      visible={isSubmitting}
                    />
                    Concluir cadastro
                  </div>
                </Button>
              </div>
            </div>
          )}
        </form>
      </FormProvider>

      <SubmitSuccessfullyModal
        isOpen={showSuccessfullyModal}
        onCloseSucessfullyModal={onCloseSucessfullyModal}
      />
    </div>
  );
};
