import React from 'react';
import { useFormContext } from 'react-hook-form';

import { TextEditor } from '~/components/Editor';
import { ErrorMessage } from '~/components/ErrorMessage';
import { useInputsErrors } from '~/hooks/useInputsErrors';
import type { CityFormData } from '~/@types/types';

export const CityDescription = () => {
  const [description, setDescription] = React.useState('');

  const { setValue, formState } = useFormContext<CityFormData>();

  const { isSubmitting, errors } = formState;

  const { hasError, message } = useInputsErrors<CityFormData>(
    errors,
    'cityDescription'
  );

  const handleEditorChange = React.useCallback(
    (data: { html: string; text: string }) => {
      const { text } = data;

      setDescription(text);

      setValue('cityDescription', text, {
        shouldValidate: true,
        shouldDirty: false,
      });
    },
    [setValue]
  );

  return (
    <div className="w-full">
      <TextEditor
        id="city"
        label="Descrição da cidade"
        maxlength={420}
        value={description}
        readOnly={isSubmitting}
        onChange={handleEditorChange}
      />

      {hasError && <ErrorMessage message={message} />}
    </div>
  );
};
