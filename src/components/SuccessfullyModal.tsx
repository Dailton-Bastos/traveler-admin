'use client';

import React from 'react';
import { Modal } from './Modal';
import { SuccessfullyIcon } from './SuccessfullyIcon';
import { useSuccessfullyModal } from '~/hooks/useSuccessfullyModal';

export const SuccessfullyModal = () => {
  const { isOpen, onClose, title } = useSuccessfullyModal();

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
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="bg-blue-900/95"
    >
      <div className="relative h-[406px] w-[380px] flex items-center flex-col">
        <SuccessfullyIcon />

        <div className="absolute bottom-0">
          <h3
            className="
            text-[54px]
            text-white
            font-semibold
            font-heebo 
            text-center
            leading-[3.75rem]
            "
          >
            {title}
          </h3>
        </div>
      </div>
    </Modal>
  );
};
