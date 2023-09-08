import React from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { TextEditor } from '~/components/Editor';
import { ErrorMessage } from '~/components/ErrorMessage';
import type { CityFormData } from '~/@types/types';

type Props = {
  hasError: boolean;
  errorMessage: string;
  setValue: UseFormSetValue<CityFormData>;
};

export const LocaleDescription = ({
  setValue,
  hasError,
  errorMessage,
}: Props) => {
  const [description, setDescription] = React.useState('');

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

  return (
    <div className="w-full">
      <TextEditor
        label="Descrição do local"
        maxlength={320}
        value={description}
        onChange={handleEditorChange}
      />

      {hasError && <ErrorMessage message={errorMessage} />}
    </div>
  );
};
