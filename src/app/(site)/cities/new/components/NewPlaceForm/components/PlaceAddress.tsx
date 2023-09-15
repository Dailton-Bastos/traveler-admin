import React from 'react';
import toast from 'react-hot-toast';
import { useFormContext } from 'react-hook-form';
import { RotatingLines } from 'react-loader-spinner';
import dynamic from 'next/dynamic';
import cep from 'cep-promise';
import { isValidCEP } from '@brazilian-utils/brazilian-utils';

import { ErrorMessage } from '~/components/ErrorMessage';
import { Input } from '~/components/Input';
import { useDebounce } from '~/hooks/useDebounce';
import { useInputsErrors } from '~/hooks/useInputsErrors';
import type { CityFormData } from '~/@types/types';

const Map = dynamic(() => import('~/components/Map'), {
  ssr: false,
  loading: () => (
    <RotatingLines
      strokeColor="#000"
      strokeWidth="3"
      animationDuration="0.95"
      width="30"
      visible
    />
  ),
});

export const PlaceAddress = () => {
  const [zipCode, setZipCode] = React.useState('');
  const [showAddressMap, setShowAddressMap] = React.useState(false);

  const debouncedValue = useDebounce<string>(zipCode, 1000);

  const { register, formState, setValue, clearErrors } =
    useFormContext<CityFormData>();

  const {
    isSubmitting,
    errors: { address },
  } = formState;

  const postalCodeErrors = useInputsErrors(address?.zipCode);
  const streetErrors = useInputsErrors(address?.street);
  const neighborhoodErrors = useInputsErrors(address?.neighborhood);
  const numberErrors = useInputsErrors(address?.number);

  const isValidPostalCode = isValidCEP(debouncedValue);

  const disabled = isSubmitting || !isValidPostalCode;

  const addZipCodeWithMask = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      const zipCodeWithMask = value.replace(/(\d{5})(\d)/, '$1-$2');

      setZipCode(zipCodeWithMask);
    },
    []
  );

  const fetchAddressByZipCode = React.useCallback(() => {
    if (!isValidPostalCode) return;

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

          clearErrors('address.zipCode');

          setShowAddressMap(true);
        }

        return 'Endereço encontrado';
      },
      error: (er) => {
        setShowAddressMap(false);
        return er?.message;
      },
    });
  }, [debouncedValue, isValidPostalCode, setValue, clearErrors]);

  React.useEffect(() => {
    fetchAddressByZipCode();
  }, [fetchAddressByZipCode]);

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
            <div className="w-full relative mb-6">
              <Input
                label="CEP"
                placeholder="00000-000"
                maxLength={9}
                value={zipCode}
                {...register('address.zipCode')}
                onChange={addZipCodeWithMask}
              />

              <div className="absolute">
                {postalCodeErrors?.hasError && (
                  <ErrorMessage message={postalCodeErrors?.message} />
                )}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="w-full relative mb-6">
              <Input
                label="Rua"
                disabled={disabled}
                {...register('address.street')}
              />

              <div className="absolute">
                {streetErrors?.hasError && (
                  <ErrorMessage message={streetErrors?.message} />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-start gap-4 mt-4">
          <div className="flex-1">
            <div className="w-full relative mb-6">
              <Input
                label="Bairro"
                disabled={disabled}
                {...register('address.neighborhood')}
              />

              <div className="absolute">
                {neighborhoodErrors?.hasError && (
                  <ErrorMessage message={neighborhoodErrors?.message} />
                )}
              </div>
            </div>
          </div>

          <div className="w-[168px]">
            <div className="w-full relative mb-6">
              <Input
                label="Número"
                placeholder="S/N"
                disabled={disabled}
                {...register('address.number')}
              />

              <div className="absolute">
                {numberErrors?.hasError && (
                  <ErrorMessage message={numberErrors?.message} />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-4">
          <Input
            label="Complemento"
            disabled={disabled}
            {...register('address.complement')}
          />
        </div>

        {showAddressMap && (
          <div className="w-full mt-10 h-[245px] rounded-lg overflow-hidden">
            <Map />
          </div>
        )}
      </div>
    </div>
  );
};
