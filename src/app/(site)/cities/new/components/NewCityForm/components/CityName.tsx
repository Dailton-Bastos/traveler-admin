import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Input } from '~/components/Input';
import { ErrorMessage } from '~/components/ErrorMessage';
import type { CityFormData } from '~/@types/types';

type Props = {
  register: UseFormRegister<CityFormData>;
  isDisabled: boolean;
  hasError: boolean;
  errorMessage: string;
};

export const CityName = ({
  register,
  isDisabled,
  hasError,
  errorMessage,
}: Props) => {
  return (
    <div className="w-full">
      <Input
        id="name"
        label="Nome da cidade"
        disabled={isDisabled}
        {...register('cityName')}
      />

      {hasError && <ErrorMessage message={errorMessage} />}
    </div>
  );
};
