'use client';

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { twMerge } from 'tailwind-merge';

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
}

export const Modal = ({
  isOpen = false,
  onChange,
  className,
  children,
}: ModalProps) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={twMerge(
            `
            bg-blue-900/90
            backdrop-blur-sm
            fixed
            inset-0
            transition-all
            duration-300
            ease-in-out
          `,
            className
          )}
        />

        <Dialog.Content
          className="
            fixed
            top-[50%]
            left-[50%]
            flex
            items-center
            justify-center
            max-h-full
            h-full
            w-full
            translate-x-[-50%]
            translate-y-[-50%]
            focus:outline-none
          "
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
