'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hasError?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ hasError, id, label, disabled, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full">
        <label htmlFor={id} className="text-gray-500 text-sm mb-2">
          {label}
        </label>

        <input
          id={id}
          ref={ref}
          disabled={disabled}
          className={twMerge(
            `
            rounded-lg
            bg-gray-50
            border
            border-solid
            h-[56px]
            indent-6
            text-gray-500
            font-roboto
            focus:outline-none
            w-full
            disabled:cursor-not-allowed
          `,
            hasError && 'animate-shake border-orange-600'
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
