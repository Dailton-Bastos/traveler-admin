import React from 'react';
import { ForgotContent } from './components/ForgotContent';

const Forgot = () => {
  return (
    <div className="w-full">
      <h1 className="text-4xl font-semibold font-barlow text-[#123952]">
        Recuperar senha
      </h1>

      <ForgotContent />
    </div>
  );
};

export default Forgot;
