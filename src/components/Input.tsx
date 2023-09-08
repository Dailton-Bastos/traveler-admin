'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  filled?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ filled, id, label, disabled, ...props }, ref) => {
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
      </div>
    );
  }
);

Input.displayName = 'Input';
