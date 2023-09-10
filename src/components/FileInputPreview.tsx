'use client';

import React from 'react';
import { FiTrash } from 'react-icons/fi';

import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

interface FileInputPreviewProps {
  className?: string;
  url: string | null;
  removeFile: () => void;
}

export const FileInputPreview = ({
  className,
  url,
  removeFile,
}: FileInputPreviewProps) => {
  if (!url) return null;

  return (
    <div
      className={twMerge(
        `
        flex
        items-center
        justify-center
        rounded-2xl
        border-2
        overflow-hidden
        relative
        w-full
        h-full
      `,
        className
      )}
    >
      <Image
        src={url}
        alt=""
        width={672}
        height={202}
        className="object-cover w-full h-full"
      />

      <button
        onClick={removeFile}
        type="button"
        className="
          flex
          items-center
          justify-center
          bg-white
          absolute
          top-2
          right-2
          w-8
          h-8
          border
          rounded-lg
          cursor-pointer
        "
      >
        <FiTrash size={18} color="#617480" />
      </button>
    </div>
  );
};
