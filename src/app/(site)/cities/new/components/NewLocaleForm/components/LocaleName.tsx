import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Input } from '~/components/Input';
import { ErrorMessage } from '~/components/ErrorMessage';
import { useInputsErrors } from '~/hooks/useInputsErrors';
import type { CityFormData } from '~/@types/types';

export const LocaleName = () => {
  const { register, formState } = useFormContext<CityFormData>();

  const { isSubmitting, errors } = formState;

  const { hasError, message } = useInputsErrors<CityFormData>(
    errors,
    'localeName'
  );

  return (
    <div className="w-full">
      <Input
        id="localeName"
        label="Nome do local"
        disabled={isSubmitting}
        hasError={hasError}
        {...register('localeName')}
      />

      {hasError && <ErrorMessage message={message} />}
    </div>
  );
};
