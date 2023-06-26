'use client';

import React from 'react';
import { useDropzone } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';
import { FileInputPreview } from './FileInputPreview';

interface FileInputProps {
  children: React.ReactNode;
  className?: string;
}

export const FileInput = ({ children, className }: FileInputProps) => {
  const [file, setFile] = React.useState<File | null>(null);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': ['.jpeg'], 'image/png': ['.png'] },
  });

  const handleRemoveFile = React.useCallback(() => {
    setFile(null);
  }, []);

  if (file) {
    return <FileInputPreview file={file} removeFile={handleRemoveFile} />;
  }

  return (
    <div
      className={twMerge(
        `
        rounded-2xl
        bg-gray-50
        border-2
        border-dashed
        border-[#DCE2E5]
        min-h-[120px]
        min-w-[120px]
        hover:border-gray-300
        transition
      `,
        isDragActive && 'border-gray-300',
        className
      )}
      {...getRootProps()}
    >
      <label
        htmlFor="dropzone-file"
        className="
          cursor-pointer
          w-full
          h-full
        "
      >
        <div
          className="
            flex
            items-center
            justify-center
            w-full
            h-full
          "
        >
          {isDragActive ? (
            <p className="font-semibold text-sm text-center text-orange-600">
              Solte para adicionar
            </p>
          ) : (
            <>{children}</>
          )}
        </div>
      </label>

      <input className="hidden" {...getInputProps} />
    </div>
  );
};
