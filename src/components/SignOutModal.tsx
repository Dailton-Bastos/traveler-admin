'use client';

import React from 'react';
import { Modal } from './Modal';
import { useSignOutModal } from '~/hooks/useSignOutModal';

interface SignOutModalProps {
  logout: () => void;
}

export const SignOutModal = ({ logout }: SignOutModalProps) => {
  const signOutModal = useSignOutModal();

  const handleChange = React.useCallback(
    (open: boolean) => {
      if (!open) {
        signOutModal.onClose();
      }
    },
    [signOutModal]
  );
  return (
    <Modal
      isOpen={signOutModal.isOpen}
      onChange={handleChange}
      className="bg-[#140804]/80"
    >
      <div className="flex items-center justify-center gap-x-16">
        <p className="text-4xl text-white font-medium font-heebo">
          Você quer mesmo sair
        </p>

        <div className="flex items-center justify-center gap-x-2">
          <button
            type="button"
            className="
              flex
              items-center
              justify-center
              rounded-lg
              border-2
              border-orange-600
              text-white
              font-semibold
              w-[94px]
              h-[48px]
              hover:border-orange-700
              transition
            "
            onClick={() => signOutModal.onClose()}
          >
            Não
          </button>

          <button
            type="button"
            className="
              flex
              items-center
              justify-center
              rounded-lg
              border-2
              bg-orange-600
              border-transparent
              text-white
              font-semibold
              w-[94px]
              h-[48px]
              hover:bg-orange-700
              transition
            "
            onClick={logout}
          >
            Sim
          </button>
        </div>
      </div>
    </Modal>
  );
};
