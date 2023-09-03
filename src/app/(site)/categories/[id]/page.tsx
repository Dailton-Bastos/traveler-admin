import React from 'react';

import { FormContent } from './components/FormContent';
import { HeaderEditCategory } from './components/Header';
import { getCategoryById } from '~/actions/getCategoryById';

interface Props {
  params: {
    id: string;
  };
}

const EditCategory = async ({ params }: Props) => {
  const category = await getCategoryById(params?.id);

  return (
    <>
      <HeaderEditCategory />

      <section className="w-full max-w-[800px] mx-auto py-12">
        <div className="w-full bg-white rounded-2xl border overflow-hidden">
          <div
            className="
              bg-gradient-to-r 
              from-[#FEF7F5] 
              from-0% 
              to-white-alpha-50 
              to-100% 
              py-14 
              pl-16 
              border-b
            "
          >
            <h1 className="text-4xl font-semibold font-barlow text-orange-600">
              Editar categoria
            </h1>
          </div>

          <FormContent data={category} />
        </div>
      </section>
    </>
  );
};

export default EditCategory;
