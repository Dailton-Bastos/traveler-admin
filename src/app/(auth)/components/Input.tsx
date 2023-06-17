'use client';

import React from 'react';
import { BiCheck } from 'react-icons/bi';
import { FiAlertCircle } from 'react-icons/fi';

import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  label?: string;
  filled?: boolean;
  isValid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, filled, isValid, id, label, disabled, ...props }, ref) => {
    return (
      <div className="flex flex-col relative group">
        <input
          id={id}
          ref={ref}
          className={twMerge(
            `
              h-[72px]
              p-6
              focus:outline-none
              focus:relative
              focus:top-2
              text-[#617480]
              w-full
            `,
            filled && 'relative top-2'
          )}
          {...props}
        />

        {!!label && (
          <label
            htmlFor={id}
            className={twMerge(
              `
              absolute
              left-6
              text-[#A0ACB2]
              pointer-events-none
              origin-top-left
              scale-100
              translate-x-0
              translate-y-[23px]
              group-focus-within:text-xs
              group-focus-within:translate-y-[12px]
              group-focus-within:scale-90
              transition
            `,
              filled && 'text-xs translate-y-[12px] scale-90'
            )}
          >
            {label}
          </label>
        )}

        {isValid && (
          <BiCheck
            size={24}
            color="#F25D27"
            className="
              absolute
              right-6
              origin-top-left
              scale-100
              translate-x-0
              translate-y-[23px]
            "
          />
        )}

        {error && (
          <FiAlertCircle
            size={24}
            color="#F25D27"
            className="
              absolute
              right-6
              origin-top-left
              scale-100
              translate-x-0
              translate-y-[23px]
            "
          />
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
