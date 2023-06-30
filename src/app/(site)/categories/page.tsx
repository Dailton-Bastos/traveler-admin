import React from 'react';

import { Category } from '~/components/Category';
import { HeaderCategory } from './components/Header';
import { getCategories } from '~/actions/getCategories';
import { EmptyCategory } from '~/components/EmptyCategory';

const Categories = async () => {
  const categories = await getCategories();

  return (
    <>
      <HeaderCategory totalCategories={categories?.length} />

      <section className="w-full max-w-[1120px] mx-auto py-12">
        <div className="grid grid-cols-3 gap-x-8">
          {categories[0] ? (
            <Category category={categories[0]} />
          ) : (
            <EmptyCategory />
          )}
          {categories[1] ? (
            <Category category={categories[1]} />
          ) : (
            <EmptyCategory />
          )}
          {categories[2] ? (
            <Category category={categories[2]} />
          ) : (
            <EmptyCategory />
          )}
        </div>
      </section>
    </>
  );
};

export default Categories;
