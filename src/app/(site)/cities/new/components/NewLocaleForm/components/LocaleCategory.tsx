import React from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { ErrorMessage } from '~/components/ErrorMessage';
import { RadioButtonCategory } from '~/components/RadioButtonCategory';
import type { CityFormData } from '~/@types/types';

type Props = {
  hasError: boolean;
  errorMessage: string;
  setValue: UseFormSetValue<CityFormData>;
};

export const LocaleCategory = ({ hasError, errorMessage, setValue }: Props) => {
  const [category, setCategory] = React.useState('');

  const handleChangeCategory = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { value } = event?.target;

      setValue('category', value, {
        shouldValidate: true,
        shouldDirty: false,
      });

      setCategory(value);
    },
    [setValue]
  );

  return (
    <div className="w-full pt-4">
      <span className="text-gray-500 text-sm mb-2 block">
        Selecione uma categoria
      </span>

      <div className="grid grid-cols-3">
        <RadioButtonCategory
          id="food"
          name="category"
          label="Comida e Bebida"
          value="food"
          checked={category === 'food'}
          onChange={handleChangeCategory}
        />

        <RadioButtonCategory
          id="pontos"
          name="category"
          label="Pontos Turísticos"
          value="pontos"
          checked={category === 'pontos'}
          onChange={handleChangeCategory}
        />

        <RadioButtonCategory
          id="events"
          name="category"
          label="Eventos Organizados"
          value="eventos"
          checked={category === 'eventos'}
          onChange={handleChangeCategory}
        />
      </div>

      {hasError && <ErrorMessage message={errorMessage} />}
    </div>
  );
};
