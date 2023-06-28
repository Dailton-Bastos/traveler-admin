import React from 'react';
import { Modal } from './Modal';
import { useSuccessModal } from '~/hooks/useSuccessModal';

interface SuccessModalProps {
  children: React.ReactNode;
}

export const SuccessModal = ({ children }: SuccessModalProps) => {
  const successModal = useSuccessModal();

  const handleChange = React.useCallback(
    (open: boolean) => {
      if (!open) {
        successModal.onClose();
      }
    },
    [successModal]
  );
  return (
    <Modal isOpen={successModal.isOpen} onChange={handleChange}>
      {children}
    </Modal>
  );
};
