'use client';

import React from 'react';
import { FiTrash } from 'react-icons/fi';
import { LuEdit3 } from 'react-icons/lu';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Category as ICategory } from '~/@types/types';
import { useLoadImage } from '~/hooks/useLoadImage';
import { DeleteModal } from './DeleteModal';

interface CategoryProps {
  category: ICategory;
}

export const Category = ({ category }: CategoryProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const iconPath = useLoadImage(category);

  const router = useRouter();

  const onClose = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <div
        className="
        bg-white
        rounded-2xl
        border
        border-[#DCE2E5]
        divide-y
        h-[628px]
      "
      >
        <div
          className="
          flex
          items-center
          justify-end
          gap-x-1
          p-8
        "
        >
          <button
            className="
            p-2
            border
            rounded-l-lg
          "
            onClick={() => router.push(`/category/${category.id}`)}
          >
            <LuEdit3 size={20} color="#617480" />
          </button>

          <button
            className="
            p-2
            border
            rounded-r-lg
          "
            onClick={() => setIsOpen(true)}
          >
            <FiTrash size={20} color="#617480" />
          </button>
        </div>

        <div
          className="
          px-8
          py-20
        "
        >
          {iconPath && (
            <Image
              alt={category?.name}
              src={iconPath}
              width={40}
              height={40}
              className="object-contain"
            />
          )}

          <h2
            className="
            text-5xl
            font-semibold
            text-blue-900
            font-barlow
            mb-32
            mt-10
          "
          >
            {category?.name}
          </h2>

          <span className="text-xl text-gray-500">88 locais</span>
        </div>
      </div>

      <DeleteModal
        title="Excluir categoria"
        description={`Tem certeza que quer excluir a categoria ${category?.name} e seus 481 locais?`}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};
