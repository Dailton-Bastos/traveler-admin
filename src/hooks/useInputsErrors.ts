import React from 'react';
import { FieldErrors, FieldValues, FieldError } from 'react-hook-form';

export function useInputsErrors<T extends FieldValues>(
  errors: FieldErrors<T>,
  field: string
) {
  const { hasError, message } = React.useMemo(
    () => ({
      hasError: Boolean(errors?.[field]),
      message: errors?.[field]?.message?.toString() ?? '',
    }),
    [errors, field]
  );

  return { hasError, message };
}
