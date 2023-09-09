import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';
import { ErrorMessage } from '~/components/ErrorMessage';
import { FileInput } from '~/components/FileInput';

type Props = {
  isDisabled: boolean;
  hasError: boolean;
  errorMessage: string;
};

export const LocaleImage = ({ isDisabled, hasError, errorMessage }: Props) => {
  const accept = React.useMemo(
    () => ({
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    }),
    []
  );

  return (
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
          name="localeImage"
        >
          <FiPlus size={14} color="#F25D27" />{' '}
          <span className="text-orange-600">Adicionar uma foto</span>
        </FileInput>
      </div>

      {hasError && <ErrorMessage message={errorMessage} />}
    </div>
  );
};