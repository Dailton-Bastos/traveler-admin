import React from 'react';
import { useFormContext } from 'react-hook-form';

import { TextEditor } from '~/components/Editor';
import { ErrorMessage } from '~/components/ErrorMessage';
import { useInputsErrors } from '~/hooks/useInputsErrors';
import type { CityFormData } from '~/@types/types';

export const PlaceDescription = () => {
  const [description, setDescription] = React.useState('');

  const { setValue, formState } = useFormContext<CityFormData>();

  const {
    isSubmitting,
    errors: { placeDescription },
  } = formState;

  const { hasError, message } = useInputsErrors(placeDescription);

  const handleEditorChange = React.useCallback(
    (data: { html: string; text: string }) => {
      const { text } = data;

      setDescription(text);

      setValue('placeDescription', text, {
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
