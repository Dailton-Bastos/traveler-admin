'use client';

import React from 'react';
import { Modal } from './Modal';
import { useSuccessfullyModal } from '~/hooks/useSuccessfullyModal';

export const SuccessfullyModal = () => {
  const { isOpen, onClose, title, description } = useSuccessfullyModal();

  const onOpenChange = React.useCallback(
    (open: boolean) => {
      if (!open) {
        onClose();
      }
    },
    [onClose]
  );

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (isOpen) {
        onClose();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <div>
        <p>Title: {title}</p>
        <p>Description: {description}</p>
      </div>
    </Modal>
  );
};
