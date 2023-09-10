import React from 'react';
import { getCategories } from '~/actions/getCategories';
import { HeaderNewCity } from './components/Header';
import { FormContent } from './components/FormContent';

const NewCity = async () => {
  const categories = await getCategories();

  return (
    <>
      <HeaderNewCity />

      <section className="w-full max-w-[800px] mx-auto py-12">
        <div className="w-full bg-white rounded-2xl border overflow-hidden">
          <FormContent categories={categories} />
        </div>
      </section>
    </>
  );
};

export default NewCity;
