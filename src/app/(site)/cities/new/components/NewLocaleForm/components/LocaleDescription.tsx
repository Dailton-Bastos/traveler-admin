import React from 'react';
import { useFormContext } from 'react-hook-form';

import { TextEditor } from '~/components/Editor';
import { ErrorMessage } from '~/components/ErrorMessage';
import { useInputsErrors } from '~/hooks/useInputsErrors';
import type { CityFormData } from '~/@types/types';

export const LocaleDescription = () => {
  const [description, setDescription] = React.useState('');

  const { setValue, formState } = useFormContext<CityFormData>();

  const { isSubmitting, errors } = formState;

  const { hasError, message } = useInputsErrors<CityFormData>(
    errors,
    'localeDescription'
  );

  const handleEditorChange = React.useCallback(
    (data: { html: string; text: string }) => {
      const { text } = data;

      setDescription(text);

      setValue('localeDescription', text, {
        shouldValidate: true,
        shouldDirty: false,
      });
    },
    [setValue]
  );

  return (
    <div className="w-full">
      <TextEditor
        id="locale"
        label="Descrição do local"
        maxlength={320}
        value={description}
        onChange={handleEditorChange}
        hasError={hasError}
        readOnly={isSubmitting}
      />

      {hasError && <ErrorMessage message={message} />}
    </div>
  );
};
