import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '~/components/ErrorMessage';
import { RadioButtonCategory } from '~/components/RadioButtonCategory';
import { useInputsErrors } from '~/hooks/useInputsErrors';
import type { Category, CityFormData } from '~/@types/types';

type Props = {
  categories: Category[];
};

export const LocaleCategory = ({ categories }: Props) => {
  const [categoryId, setCategoryId] = React.useState('');

  const { setValue, formState } = useFormContext<CityFormData>();

  const { isSubmitting, errors } = formState;

  const { hasError, message } = useInputsErrors<CityFormData>(
    errors,
    'categoryId'
  );

  const handleChangeCategory = React.useCallback(
    (id: string): void => {
      setValue('categoryId', id, {
        shouldValidate: true,
        shouldDirty: false,
      });

      setCategoryId(id);
    },
    [setValue]
  );

  return (
    <div className="w-full pt-4">
      <span className="text-gray-500 text-sm mb-2 block">
        Selecione uma categoria
      </span>

      <div className="grid grid-cols-3">
        {categories?.map((item) => {
          const id = String(item.id);

          return (
            <RadioButtonCategory
              key={id}
              name="categoryId"
              id={id}
              label={item?.name}
              onChange={() => handleChangeCategory(id)}
              category={item}
              checked={categoryId === id}
              disabled={isSubmitting}
            />
          );
        })}
      </div>

      {hasError && <ErrorMessage message={message} />}
    </div>
  );
};
