import React from 'react';

import { HeaderContainer } from '~/components/HeaderContainer';
import { HeaderCities } from './components/Header';

const Cities = () => {
  return (
    <>
      <HeaderContainer>
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-semibold font-barlow text-blue-900">
            Cidades
          </h1>

          <HeaderCities />
        </div>
      </HeaderContainer>
      <div>Cities</div>
    </>
  );
};

export default Cities;
