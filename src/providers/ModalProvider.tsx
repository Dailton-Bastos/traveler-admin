'use client';

import React from 'react';
import { SuccessfullyModal } from '~/components/SuccessfullyModal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <React.Fragment>
      <SuccessfullyModal />
    </React.Fragment>
  );
};
