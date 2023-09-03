import React from 'react';
import { HeaderNewCity } from './components/Header';
import { FormContent } from './components/FormContent';

const NewCity = () => {
  return (
    <>
      <HeaderNewCity />

      <section className="w-full max-w-[800px] mx-auto py-12">
        <div className="w-full bg-white rounded-2xl border overflow-hidden">
          <FormContent />
        </div>
      </section>
    </>
  );
};

export default NewCity;
