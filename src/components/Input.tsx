'use client';

import React from 'react';
import type { FieldError } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  label?: string;
  filled?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, filled, id, label, disabled, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full">
        <label htmlFor={id} className="text-gray-500 text-sm mb-2">
          {label}
        </label>

        <input
          id={id}
          ref={ref}
          disabled={disabled}
          className="
            rounded-lg
            bg-gray-50
            border
            h-[56px]
            indent-6
            text-gray-500
            font-roboto
            focus:outline-none
            w-full
            disabled:cursor-not-allowed
          "
          {...props}
        />

        {!!error && (
          <small className="text-[#F25D27] mt-2">{error?.message}</small>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
