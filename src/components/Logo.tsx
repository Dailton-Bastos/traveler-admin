import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
}

export const Logo = ({ className }: Props) => {
  return (
    <div
      className={twMerge(
        `
        flex
        justify-center
        items-center
      `,
        className
      )}
    >
      <svg
        width="22"
        height="48"
        viewBox="0 0 22 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_10719_2241)">
          <path
            d="M1.74645 22.6381L0 20.0033L12.4746 2.02477C12.9972 1.27144 13.7212 0.687992 14.5599 0.344288C15.3987 0.000584512 16.3166 -0.0887993 17.2038 0.0868409L22 20.5322L20.0562 22.595L10.1479 20.5708L1.74645 22.6381ZM10.4408 17.163L18.1583 18.7401L14.8231 4.52139L5.27968 18.2727H5.28899L9.72461 17.1807L10.4408 17.163Z"
            fill="white"
          />
          <path
            d="M4.79621 47.9131L0 27.4671L1.9438 25.4043L11.854 27.4291L20.2554 25.3605L22.0019 27.996L9.52291 45.9752C9.00043 46.7279 8.27682 47.311 7.43859 47.6547C6.60037 47.9983 5.68301 48.0881 4.79621 47.9131ZM3.84168 29.2586L7.17693 43.4779L16.7203 29.7272L12.2754 30.8192L11.5592 30.8332L3.84168 29.2586Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_10719_2241">
            <rect width="22" height="48" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
