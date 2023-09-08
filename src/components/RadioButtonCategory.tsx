'use client';

import React from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const RadioButtonCategory = React.forwardRef<HTMLInputElement, Props>(
  ({ className, id, label, checked, ...props }, ref) => {
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
            <Image
              src="/_next/image?url=https%3A%2F%2Fnpglzlnebwpzswwxzeow.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Fcategories%2Ficon-category-lm2fknjb&w=96&q=75"
              alt={label}
              width={40}
              height={40}
            />

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
                checked && 'bg-[#DCF5DD] border-2 border-green-500'
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
