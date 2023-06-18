'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';

export const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: '#fff',
          color: '#123952',
        },
        position: 'top-right',
      }}
    />
  );
};
