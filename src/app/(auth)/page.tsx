import React from 'react';

import { FormContent } from './components/FormContent';

const Login = () => {
  return (
    <div className="w-full">
      <h1 className="text-4xl font-semibold font-barlow text-[#123952]">
        Fazer login
      </h1>

      <FormContent />
    </div>
  );
};

export default Login;
