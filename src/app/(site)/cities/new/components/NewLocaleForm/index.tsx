'use client';

import React from 'react';
import type { FieldErrors } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import { UseFormRegister } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { Input } from '~/components/Input';
import { FileInput } from '~/components/FileInput';
import { Button } from '~/components/Button';
import { Alert } from '~/components/Alert';

import { FormHeader } from '../FormHeader';
import { CityFormData } from '../FormContent';
import { TextEditor } from '~/components/Editor';
import { useCityStore } from '~/stores/useCityStore';

type Props = {
  isDisabled: boolean;
  errors: FieldErrors<CityFormData>;
  register: UseFormRegister<CityFormData>;
};

export const NewLocaleForm = (props: Props) => {
  const [description, setDescription] = React.useState('');

  const { isDisabled, errors, register } = props;

  const goToPreviousStep = useCityStore((state) => state.setCurrentStep);

  const handleEditorChange = React.useCallback(
    (data: { html: string; text: string }) => {
      const newValue = data?.text.replace(/\d/g, '');

      setDescription(newValue);
    },
    []
  );

  const accept = React.useMemo(
    () => ({
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    }),
    []
  );

  React.useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="w-full">
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
            error={errors?.name}
            {...register('name')}
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

            {!!errors?.image && (
              <small className="text-orange-600 mt-2">
                {errors?.image?.message?.toString()}
              </small>
            )}
          </div>

          <TextEditor
            label="Descrição do local"
            maxlength={320}
            value={description}
            onChange={handleEditorChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <Alert />

          <div className="flex items-center justify-center gap-2">
            <Button
              type="button"
              className="bg-blue-500 font-semibold hover:bg-blue-900"
              onClick={() => goToPreviousStep('01')}
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
