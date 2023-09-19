import React from 'react';
import { FiTrash } from 'react-icons/fi';
import { RiEditLine } from 'react-icons/ri';
import Image from 'next/image';

// type Props = {
//   image_url: string
//   name: string
//   totalPlaces: string
// }

export const CityThumb = () => {
  return (
    <div
      className="
        bg-white
          w-[256px]
          h-[266px]
          rounded-2xl
          shadow
          overflow-hidden
        "
    >
      <div className="w-full h-[160px] overflow-hidden relative">
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

        <Image
          src="/images/city_thumb.png"
          alt=""
          loading="lazy"
          width={256}
          height={160}
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="p-6">
        <h4 className="text-xl font-semibold font-barlow text-blue-900">
          Florianópolis
        </h4>

        <span className="text-gray-500 font-roboto text-base">1 local</span>
      </div>
    </div>
  );
};
