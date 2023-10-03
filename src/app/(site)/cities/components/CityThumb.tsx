import React from 'react';
import { FiTrash } from 'react-icons/fi';
import { RiEditLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { useLoadImage } from '~/hooks/useLoadImage';
import type { CityCard } from '~/@types/types';

type Props = {
  city: CityCard;
};

export const CityThumb = ({ city }: Props) => {
  const { id, image_path, name, totalPlaces } = city;

  const imageUrl = useLoadImage(image_path);

  const router = useRouter();

  const handleToEditPage = React.useCallback(() => {
    router.push(`/cities/${id}/edit`);
  }, [router, id]);

  return (
    <div
      className="
        bg-white
          w-[256px]
          rounded-2xl
          shadow
          overflow-hidden
        "
    >
      <div className="w-full relative">
        <div
          className="
          flex
          items-center
          justify-end
          gap-x-1
          py-4
          pr-4
          absolute
          right-0
          top-0
        "
        >
          <button
            title="Editar"
            className="
              bg-white
              p-2
              border
              rounded-l-lg
            "
            onClick={handleToEditPage}
          >
            <RiEditLine size={20} color="#617480" />
          </button>

          <button
            title="Excluir"
            className="
              bg-white
              p-2
              border
              rounded-r-lg
            "
          >
            <FiTrash size={20} color="#617480" />
          </button>
        </div>

        {imageUrl && (
          <Image
            src={imageUrl}
            alt=""
            loading="lazy"
            width={256}
            height={160}
            style={{ objectFit: 'cover' }}
          />
        )}
      </div>

      <div className="p-6">
        <h4 className="text-xl font-semibold font-barlow text-blue-900">
          {name}
        </h4>

        <span className="text-gray-500 font-roboto text-base">
          {totalPlaces} {totalPlaces > 1 ? 'locais' : 'local'}
        </span>
      </div>
    </div>
  );
};
