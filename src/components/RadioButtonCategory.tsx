'use client';

import React from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import type { Category } from '~/@types/types';
import { useLoadImage } from '~/hooks/useLoadImage';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  category: Category;
};

export const RadioButtonCategory = React.forwardRef<HTMLInputElement, Props>(
  ({ className, id, label, checked, category, ...props }, ref) => {
    const iconPath = useLoadImage(category);

    return (
      <label
        htmlFor={id}
        className={twMerge(
          `
            block
            w-[213px]
            h-[204px]
            border
            border-gray-100
            bg-gray-50
            rounded-lg
            cursor-pointer
            hover:bg-gradient-to-l
            hover:from-gray-50
            hover:to-[#FFF8F5]
            hover:transition-all
          `,
          checked && 'bg-gradient-to-l from-gray-50 to-[#FFF8F5]'
        )}
      >
        <input className="hidden" type="radio" id={id} ref={ref} {...props} />

        <div className="divide-y">
          <div className="flex items-center justify-between px-6 py-6">
            {iconPath && (
              <Image src={iconPath} alt={label} width={40} height={40} />
            )}

            <div
              className={twMerge(
                `
                flex
                items-center
                justify-center
                w-6
                h-6
                bg-white
                rounded-lg
                border
              `,
                checked && 'bg-[#DCF5DD] border-2 border-green-500 transition'
              )}
            >
              <div
                className={twMerge(
                  `
                  w-2.5
                  h-2.5
                  bg-white
                  rounded
                `,
                  checked && 'bg-green-500'
                )}
              />
            </div>
          </div>

          <div className="px-6 py-6">
            <h2
              className="
                text-xl
                font-semibold
                font-barlow
                text-blue-900
                max-w-[80px]
              "
            >
              {label}
            </h2>
          </div>
        </div>
      </label>
    );
  }
);

RadioButtonCategory.displayName = 'Input';
