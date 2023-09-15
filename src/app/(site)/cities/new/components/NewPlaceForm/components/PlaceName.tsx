import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Input } from '~/components/Input';
import { ErrorMessage } from '~/components/ErrorMessage';
import { useInputsErrors } from '~/hooks/useInputsErrors';
import type { CityFormData } from '~/@types/types';

export const PlaceName = () => {
  const { register, formState } = useFormContext<CityFormData>();

  const {
    isSubmitting,
    errors: { placeName },
  } = formState;

  const { hasError, message } = useInputsErrors(placeName);

  return (
    <div className="w-full">
      <Input
        id="placeName"
        label="Nome do local"
        disabled={isSubmitting}
        hasError={hasError}
        {...register('placeName')}
      />

      {hasError && <ErrorMessage message={message} />}
    </div>
  );
};
