'use client';

import React from 'react';
import type { FieldErrors, UseFormSetValue } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import { UseFormRegister } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { Input } from '~/components/Input';
import { FileInput } from '~/components/FileInput';
import { Button } from '~/components/Button';
import { Alert } from '~/components/Alert';

import { FormHeader } from '../FormHeader';
import { TextEditor } from '~/components/Editor';
import { useCityStore } from '~/stores/useCityStore';
import { RadioButtonCategory } from '~/components/RadioButtonCategory';
import type { CityFormData } from '~/@types/types';

type Props = {
  isDisabled: boolean;
  errors: FieldErrors<CityFormData>;
  register: UseFormRegister<CityFormData>;
  className?: string;
  setValue: UseFormSetValue<CityFormData>;
};

export const NewLocaleForm = (props: Props) => {
  const [category, setCategory] = React.useState('');
  const [description, setDescription] = React.useState('');

  const { isDisabled, errors, register, className, setValue } = props;

  const goToPreviousStep = useCityStore((state) => state.setCurrentStep);

  const handleEditorChange = React.useCallback(
    (data: { html: string; text: string }) => {
      const newValue = data?.text.replace(/\d/g, '');

      setDescription(newValue);

      setValue('localeDescription', newValue, {
        shouldValidate: true,
        shouldDirty: false,
      });
    },
    [setValue]
  );

  const handleChangeCategory = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { value } = event?.target;

      setValue('category', value, {
        shouldValidate: true,
        shouldDirty: false,
      });

      setCategory(value);
    },
    [setValue]
  );

  const handleGoToPreviousStep = React.useCallback(() => {
    goToPreviousStep('01');

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [goToPreviousStep]);

  const accept = React.useMemo(
    () => ({
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    }),
    []
  );

  return (
    <div className={twMerge(`w-full`, className)}>
      <FormHeader currentStep="02" title="Adicione um local" />

      <div className="py-12 px-16">
        <div className="border-b pb-4">
          <h2 className="text-2xl text-blue-900 font-barlow font-medium">
            Dados básicos
          </h2>
        </div>

        <div className="flex flex-col items-start pt-6 pb-12 gap-y-6">
          <Input
            id="name"
            label="Nome do local"
            disabled={isDisabled}
            error={errors?.localeName}
            {...register('localeName')}
          />

          <div className="w-full h-fit">
            <span className="text-gray-500 text-sm">Foto do local</span>

            <div
              className={twMerge(
                `
                  overflow-hidden
                  mt-2
              `,
                isDisabled && 'cursor-not-allowed pointer-events-none'
              )}
            >
              <FileInput
                className="w-full h-[160px]"
                accept={accept}
                name="image"
              >
                <FiPlus size={14} color="#F25D27" />{' '}
                <span className="text-orange-600">Adicionar uma foto</span>
              </FileInput>
            </div>

            {!!errors?.localeImage && (
              <small className="text-orange-600 mt-2">
                {errors?.localeImage?.message?.toString()}
              </small>
            )}
          </div>

          <TextEditor
            label="Descrição do local"
            maxlength={320}
            value={description}
            onChange={handleEditorChange}
          />

          {!!errors?.localeDescription && (
            <small className="text-orange-600 mt-2">
              {errors?.localeDescription?.message?.toString()}
            </small>
          )}

          <div className="w-full">
            <span className="text-gray-500 text-sm mb-2 block">
              Selecione uma categoria
            </span>

            <div className="grid grid-cols-3">
              <RadioButtonCategory
                id="food"
                name="category"
                label="Comida e Bebida"
                value="food"
                checked={category === 'food'}
                onChange={handleChangeCategory}
              />

              <RadioButtonCategory
                id="pontos"
                name="category"
                label="Pontos Turísticos"
                value="pontos"
                checked={category === 'pontos'}
                onChange={handleChangeCategory}
              />

              <RadioButtonCategory
                id="events"
                name="category"
                label="Eventos Organizados"
                value="eventos"
                checked={category === 'eventos'}
                onChange={handleChangeCategory}
              />
            </div>

            {!!errors?.category && (
              <small className="text-orange-600 mt-2">
                {errors?.category?.message?.toString()}
              </small>
            )}
          </div>
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
