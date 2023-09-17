'use client';

import React from 'react';
import { SuccessfullyModal } from '~/components/SuccessfullyModal';
import { useIsMounted } from '~/hooks/useIsMounted';

export const ModalProvider = () => {
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <React.Fragment>
      <SuccessfullyModal />
    </React.Fragment>
  );
};
