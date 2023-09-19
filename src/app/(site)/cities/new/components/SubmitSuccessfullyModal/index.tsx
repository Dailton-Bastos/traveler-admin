'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { Modal } from '~/components/Modal';
import { SuccessfullyIcon } from './SuccessfullyIcon';
import { Button } from '~/components/Button';
import { CityThumb } from '../../../components/CityThumb';
import { PlaceThumb } from '~/components/PlaceThumb';

type Props = {
  isOpen: boolean;
  onCloseSucessfullyModal: () => void;
};

export const SubmitSuccessfullyModal = ({
  isOpen,
  onCloseSucessfullyModal,
}: Props) => {
  const router = useRouter();

  const handleRedirectToCityProfile = React.useCallback(() => {
    onCloseSucessfullyModal();

    router.push('/cities/01');
  }, [router, onCloseSucessfullyModal]);

  return (
    <Modal isOpen={isOpen} className="backdrop-blur-none bg-gray-50">
      <div
        className="
          flex
          items-start
          justify-between
          max-w-[713px]
          w-full
        "
      >
        <div className="relative h-[406px] w-[380px] flex items-center flex-col">
          <SuccessfullyIcon />

          <div className="absolute -bottom-[8.5rem]">
            <h3
              className="
                text-[54px]
                text-blue-900
                font-semibold
                font-heebo 
                text-center
                leading-[3.75rem]
                mb-6
              "
            >
              Perfil cadastrado!
            </h3>

            <p className="text-gray-500 font-heebo text-center">
              Você tem uma nova cidade e um novo ponto cadastrado. Continue
              sempre adicionando locais incríveis.
            </p>

            <Button
              className="
                block 
                mt-10 
                mx-auto 
                bg-orange-600
                font-heebo
                font-semibold
                py-0
                px-0
                w-[108px]
                h-[48px]
                hover:bg-orange-700
                outline-none
              "
              onClick={handleRedirectToCityProfile}
            >
              Finalizar
            </Button>
          </div>
        </div>

        <div className="flex items-center flex-col gap-y-10">
          <CityThumb />

          <PlaceThumb />
        </div>
      </div>
    </Modal>
  );
};
