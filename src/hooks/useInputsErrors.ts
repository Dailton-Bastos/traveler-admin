import React from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

type FieldErrorType =
  | FieldError
  | Merge<FieldError, FieldErrorsImpl<any>>
  | undefined;

export function useInputsErrors(fieldError: FieldErrorType) {
  const { hasError, message } = React.useMemo(
    () => ({
      hasError: Boolean(fieldError?.message),
      message: fieldError?.message?.toString() ?? '',
    }),
    [fieldError]
  );

  return { hasError, message };
}
