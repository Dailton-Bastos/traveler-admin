import React from 'react';
import { FiPlus } from 'react-icons/fi';

import { Button } from '~/components/Button';
import { Header } from '~/components/Header';

const Cities = () => {
  return (
    <>
      <Header>
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-semibold font-barlow text-blue-900">
            Cidades
          </h1>

          <Button>
            <div className="flex items-center gap-x-1">
              <FiPlus color="#fff" />
              Adicionar um perfil
            </div>
          </Button>
        </div>
      </Header>
      <div>Cities</div>
    </>
  );
};

export default Cities;
