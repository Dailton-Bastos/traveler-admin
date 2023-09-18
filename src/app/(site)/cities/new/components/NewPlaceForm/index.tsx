'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

import { FormHeader } from '../FormHeader';

import { PlaceName } from './components/PlaceName';
import { PlaceImage } from './components/PlaceImage';
import { PlaceDescription } from './components/PlaceDescription';
import { PlaceCategory } from './components/PlaceCategory';
import { PlaceAddress } from './components/PlaceAddress';
import type { Category } from '~/@types/types';

type Props = {
  className?: string;
  categories: Category[];
};

export const NewPlaceForm = ({ className, categories }: Props) => {
  return (
    <div className={twMerge(`w-full`, className)}>
      <FormHeader currentStep="02" title="Adicione um local" />

      <div className="pt-12 px-16">
        <div className="border-b pb-4">
          <h2 className="text-2xl text-blue-900 font-barlow font-medium">
            Dados básicos
          </h2>
        </div>

        <div className="flex flex-col items-start pt-6 gap-y-6">
          <PlaceName />

          <PlaceImage />

          <PlaceDescription />

          <PlaceCategory categories={categories} />

          <PlaceAddress />
        </div>
      </div>
    </div>
  );
};
