'use client';

import React from 'react';
import { BiCheck } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  keepLogged?: boolean;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { keepLogged, ...props },
  ref
) => {
  return (
    <div
      className="
        flex
        items-center
        justify-start
        gap-x-4
        relative
      "
    >
      <div className="relative w-6 h-6 group">
        <div
          className={twMerge(
            `
              absolute
              border
              border-slate-300
              bg-white
              rounded-lg
              h-6
              w-6
            `,
            keepLogged && 'bg-[#51B853] border-transparent',
            !keepLogged &&
              `
              group-hover:bg-[#03ac6c29] 
              group-hover:border-[#3FAC6C] 
              group-hover:transition-all
              `
          )}
        />

        <div
          className="
            absolute
            left-0
            opacity-100
            h-6
            w-6
          "
        >
          {keepLogged && (
            <div
              className="
                absolute
                flex
                items-center
                justify-center
                bottom-0
                top-0
                w-full
                text-white
                left-0
                overflow-hidden
              "
            >
              <BiCheck color="#fff" size={16} />
            </div>
          )}
        </div>

        <input
          type="checkbox"
          id="keep_logged"
          checked={keepLogged}
          className="absolute w-6 h-6 opacity-0 cursor-pointer"
          {...props}
          ref={ref}
        />
      </div>

      <label htmlFor="keep_logged" className="text-[#A0ACB2]">
        Lembrar-me
      </label>
    </div>
  );
};

export const InputCheckbox = React.forwardRef(Input);
