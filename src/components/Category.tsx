'use client';

import React from 'react';
import { FiPlus } from 'react-icons/fi';

export const Category = () => {
  return (
    <div
      className="
        flex
        items-center
        justify-center
        bg-white-alpha-700
        rounded-2xl
        border-2
        border-dashed
        border-[#DCE2E5]
        h-[628px]
      "
    >
      <FiPlus size={14} color="#F25D27" />
    </div>
  );
};
