import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

import { ErrorMessage } from '~/components/ErrorMessage';
import { FileInput } from '~/components/FileInput';
import { useInputsErrors } from '~/hooks/useInputsErrors';
import type { CityFormData } from '~/@types/types';

export const CityImage = () => {
  const { formState } = useFormContext<CityFormData>();

  const {
    isSubmitting,
    errors: { cityImage },
  } = formState;

  const { hasError, message } = useInputsErrors(cityImage);

  const accept = React.useMemo(
    () => ({
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    }),
    []
  );

  return (
    <div className="w-full h-fit">
      <span className="text-gray-500 text-sm">Foto da cidade</span>

      <div
        className={twMerge(
          `
          overflow-hidden
          mt-2
      `,
          isSubmitting && 'cursor-not-allowed pointer-events-none'
        )}
      >
        <FileInput
          className="w-full h-[160px]"
          accept={accept}
          name="cityImage"
        >
          <FiPlus size={14} color="#F25D27" />{' '}
          <span className="text-orange-600">Adicionar uma foto</span>
        </FileInput>
      </div>

      {hasError && <ErrorMessage message={message} />}
    </div>
  );
};
