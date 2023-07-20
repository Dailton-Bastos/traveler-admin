import React from 'react';

import { Category } from '~/components/Category';
import { HeaderCategory } from './components/Header';
import { getCategories } from '~/actions/getCategories';
import { EmptyCategory } from '~/components/EmptyCategory';

const Categories = async () => {
  const categories = await getCategories();

  const [category1, category2, category3] = categories;

  return (
    <>
      <HeaderCategory totalCategories={categories?.length} />

      <section className="w-full max-w-[1120px] mx-auto py-12">
        <div className="grid grid-cols-3 gap-x-8">
          {category1 ? <Category category={category1} /> : <EmptyCategory />}
          {category2 ? <Category category={category2} /> : <EmptyCategory />}
          {category3 ? <Category category={category3} /> : <EmptyCategory />}
        </div>
      </section>
    </>
  );
};

export default Categories;
