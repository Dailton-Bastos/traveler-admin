import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Input } from '~/components/Input';
import { ErrorMessage } from '~/components/ErrorMessage';
import { useInputsErrors } from '~/hooks/useInputsErrors';
import type { CityFormData } from '~/@types/types';

export const CityName = () => {
  const { register, formState } = useFormContext<CityFormData>();

  const { isSubmitting, errors } = formState;

  const { hasError, message } = useInputsErrors<CityFormData>(
    errors,
    'cityName'
  );

  return (
    <div className="w-full">
      <Input
        id="cityName"
        label="Nome da cidade"
        disabled={isSubmitting}
        {...register('cityName')}
      />

      {hasError && <ErrorMessage message={message} />}
    </div>
  );
};
