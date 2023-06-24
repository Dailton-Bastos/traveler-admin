import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, disabled = false, type = 'button', ...props },
    ref
  ) => {
    return (
      <button
        className={twMerge(
          `
          bg-green-500
          rounded-lg
          border
          border-transparent
          text-white
          shadow-sm
          font-medium
          py-2.5
          px-8
          disabled:cursor-not-allowed
          disabled:opacity-50
          hover:bg-green-600
          transition
          `,
          className
        )}
        type={type}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
