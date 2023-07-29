import React from 'react';

import { FormContent } from './components/FormContent';
import { HeaderNewCategory } from './components/Header';
import { getCategories } from '~/actions/getCategories';

const NewCategory = async () => {
  const categories = await getCategories();

  const totalCategories = categories?.length ?? 0;

  return (
    <>
      <HeaderNewCategory />

      <section className="w-full max-w-[800px] mx-auto py-12">
        <div className="w-full bg-white rounded-2xl border overflow-hidden">
          <div
            className="
              bg-gradient-to-r 
              from-[#F5FFF5] 
              from-0% 
              to-white-alpha-50 
              to-100% 
              py-14 
              pl-16 
              border-b
            "
          >
            <h1 className="text-4xl font-semibold font-barlow text-[#51B853]">
              Adicione uma categoria
            </h1>
          </div>

          <FormContent totalCategories={totalCategories} />
        </div>
      </section>
    </>
  );
};

export default NewCategory;
