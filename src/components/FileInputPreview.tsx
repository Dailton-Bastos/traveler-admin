'use client';

import React from 'react';
import { FiTrash } from 'react-icons/fi';

import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

interface FileInputPreviewProps {
  className?: string;
  file: File | null;
  removeFile: () => void;
}

export const FileInputPreview = ({
  className,
  file,
  removeFile,
}: FileInputPreviewProps) => {
  if (!file) return null;

  const url = URL.createObjectURL(file);

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
        width={500}
        height={500}
        className="object-cover w-auto h-auto"
      />

      <button
        onClick={removeFile}
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
