import React from 'react';
import { FiTrash } from 'react-icons/fi';
import { RiEditLine } from 'react-icons/ri';
import Image from 'next/image';

export const PlaceThumb = () => {
  return (
    <div
      className="
      bg-white
        w-[256px]
        rounded-2xl
        shadow
        relative
      "
    >
      <div
        className="
          flex
          items-center
          justify-center
          flex-col
          gap-y-1.5
          bg-orange-600
          rounded-lg
          absolute
          ml-4
          -mt-4
          left-0
          top-0
          z-10
          w-14
          h-[83px]
        "
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.0003 1.66675L12.5753 6.88342L18.3337 7.72508L14.167 11.7834L15.1503 17.5168L10.0003 14.8084L4.85033 17.5168L5.83366 11.7834L1.66699 7.72508L7.42533 6.88342L10.0003 1.66675Z"
            fill="white"
            stroke="#F5F8FA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className="text-gray-50 font-semibold font-barlow text-xl">
          -
        </span>
      </div>
      <div className="w-full h-[160px] overflow-hidden relative rounded-t-2xl">
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
          src="/images/place_thumb.png"
          alt=""
          loading="lazy"
          width={256}
          height={160}
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="divide-y">
        <div className="p-6">
          <h4 className="text-xl font-semibold font-barlow text-blue-900">
            Doce & Companhia
          </h4>
        </div>

        <div className="flex items-center justify-between p-6">
          <span className="text-gray-500 font-roboto text-base">
            Comida e Bebida
          </span>

          <Image
            src="/images/category.png"
            alt=""
            width={24}
            height={24}
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
};
