import React from 'react';
import toast from 'react-hot-toast';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import uniqid from 'uniqid';
import cep from 'cep-promise';
import { isValidCEP } from '@brazilian-utils/brazilian-utils';
import { CityFormData } from '~/@types/types';
import { ErrorMessage } from '~/components/ErrorMessage';
import { Input } from '~/components/Input';
import { useDebounce } from '~/hooks/useDebounce';

type Props = {
  register: UseFormRegister<CityFormData>;
  isDisabled: boolean;
  errors: FieldErrors<CityFormData>;
  setValue: UseFormSetValue<CityFormData>;
};

export const LocaleAddress = ({
  register,
  setValue,
  isDisabled,
  errors,
}: Props) => {
  const [zipCode, setZipCode] = React.useState('');
  const [disableInputs, setDisableInputs] = React.useState(true);

  const debouncedValue = useDebounce<string>(zipCode, 1000);

  const disabled = isDisabled || disableInputs;

  const formsErrors = React.useMemo(
    () => [
      {
        id: uniqid(),
        hasError: Boolean(errors?.address?.zipCode),
        message: errors?.address?.zipCode?.message?.toString() ?? '',
      },
      {
        id: uniqid(),
        hasError: Boolean(errors?.address?.street),
        message: errors?.address?.street?.message?.toString() ?? '',
      },
      {
        id: uniqid(),
        hasError: Boolean(errors?.address?.neighborhood),
        message: errors?.address?.neighborhood?.message?.toString() ?? '',
      },
      {
        id: uniqid(),
        hasError: Boolean(errors?.address?.number),
        message: errors?.address?.number?.message?.toString() ?? '',
      },
    ],
    [errors]
  );

  const addZipCodeWithMask = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      const zipCodeWithMask = value.replace(/(\d{5})(\d)/, '$1-$2');

      setZipCode(zipCodeWithMask);
    },
    []
  );

  const fetchAddressByZipCode = React.useCallback(() => {
    if (!isValidCEP(debouncedValue)) return;

    const promise = cep(debouncedValue);

    toast.promise(promise, {
      loading: 'Procurando endereço...',
      success: (data) => {
        if (data) {
          setValue('address.street', data?.street, {
            shouldValidate: true,
            shouldDirty: false,
          });
          setValue('address.neighborhood', data?.neighborhood, {
            shouldValidate: true,
            shouldDirty: false,
          });
        }

        return 'Endereço encontrado';
      },
      error: (er) => er?.message,
    });
  }, [debouncedValue, setValue]);

  React.useEffect(() => {
    fetchAddressByZipCode();
  }, [fetchAddressByZipCode]);

  React.useEffect(() => {
    if (debouncedValue) {
      setDisableInputs(!isValidCEP(debouncedValue));
    }
  }, [debouncedValue]);

  return (
    <div className="w-full">
      <div className="border-b pt-10 pb-6">
        <h2 className="text-2xl text-blue-900 font-barlow font-medium">
          Endereço
        </h2>
      </div>

      <div className="py-10">
        <div className="flex items-center justify-start gap-4">
          <div className="w-[168px]">
            <div className="w-full">
              <Input
                label="CEP"
                placeholder="00000-000"
                maxLength={9}
                value={zipCode}
                {...register('address.zipCode')}
                onChange={addZipCodeWithMask}
              />
            </div>
          </div>

          <div className="w-full">
            <Input
              label="Rua"
              disabled={disabled}
              {...register('address.street')}
            />
          </div>
        </div>

        <div className="flex items-center justify-start gap-4 mt-4">
          <div className="w-full">
            <Input
              label="Bairro"
              disabled={disabled}
              {...register('address.neighborhood')}
            />
          </div>

          <div className="w-[168px]">
            <Input
              label="Número"
              placeholder="S/N"
              disabled={disabled}
              {...register('address.number')}
            />
          </div>
        </div>

        <div className="w-full mt-4">
          <Input
            label="Complemento"
            disabled={disabled}
            {...register('address.complement')}
          />
        </div>

        <ul className="list-inside">
          {formsErrors?.map((error) => {
            if (error?.hasError) {
              return (
                <li key={error?.id}>
                  <ErrorMessage message={error?.message} />
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};
