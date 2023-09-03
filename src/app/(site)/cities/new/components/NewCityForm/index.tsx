import React from 'react';
import { FormHeader } from '../FormHeader';
import { twMerge } from 'tailwind-merge';
import { Input } from '~/components/Input';
import { FileInput } from '~/components/FileInput';
import { FiPlus } from 'react-icons/fi';
import { Button } from '~/components/Button';
import { Alert } from '~/components/Alert';
import { UseFormRegister } from 'react-hook-form';
import type { FieldErrors } from 'react-hook-form';
import { CityFormData } from '../FormContent';

type Props = {
  isDisabled: boolean;
  errors: FieldErrors<CityFormData>;
  register: UseFormRegister<CityFormData>;
};

export const NewCityForm = (props: Props) => {
  const { isDisabled, errors, register } = props;

  const accept = React.useMemo(
    () => ({
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    }),
    []
  );

  return (
    <div className="w-full">
      <FormHeader currentStep="01" title="Adicione uma cidade" />

      <div className="py-12 px-16">
        <div className="border-b pb-4">
          <h2 className="text-2xl text-blue-900 font-barlow font-medium">
            Dados da cidade
          </h2>
        </div>

        <div className="flex flex-col items-start pt-6 pb-12 gap-y-6">
          <Input
            id="name"
            label="Nome da cidade"
            disabled={isDisabled}
            error={errors?.name}
            {...register('name')}
          />

          <div className="w-full h-fit">
            <span className="text-gray-500 text-sm">Foto da cidade</span>

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

          <Input
            id="name"
            label="Nome da categoria"
            disabled={isDisabled}
            error={errors?.name}
            {...register('name')}
          />
        </div>

        <div className="flex items-center justify-between">
          <Alert />

          <Button
            type="button"
            className="bg-blue-500 font-semibold hover:bg-blue-900"
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
};
