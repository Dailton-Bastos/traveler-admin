'use client';

import React from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { FileInputPreview } from './FileInputPreview';

interface FileInputProps {
  children: React.ReactNode;
  name: string;
  className?: string;
  accept: Accept;
  hasError?: boolean;
}

export const FileInput = ({
  children,
  name,
  className,
  accept,
  hasError,
  ...rest
}: FileInputProps) => {
  const { register, unregister, setValue, watch, resetField } =
    useFormContext();

  const files: File[] = watch(name);

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      setValue(name, acceptedFiles, { shouldValidate: true });
    },
    [setValue, name]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
  });

  const handleRemoveFile = React.useCallback(() => {
    resetField(name);
  }, [resetField, name]);

  React.useEffect(() => {
    register(name);

    return () => unregister(name);
  }, [register, unregister, name]);

  if (files?.length) {
    const url = URL.createObjectURL(files[0]);

    return <FileInputPreview url={url} removeFile={handleRemoveFile} />;
  }

  return (
    <div
      className={twMerge(
        `
        rounded-2xl
        bg-gray-50
        border-2
        border-dashed
        min-h-[120px]
        min-w-[120px]
        hover:border-gray-300
        transition
      `,
        isDragActive && 'border-gray-300',
        hasError && 'animate-shake border-orange-600',
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

      <input className="hidden" {...rest} {...getInputProps} />
    </div>
  );
};
