import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { twMerge } from 'tailwind-merge';

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
}

export const Modal = ({
  isOpen = false,
  onOpenChange,
  className,
  children,
}: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={twMerge(
            `
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
