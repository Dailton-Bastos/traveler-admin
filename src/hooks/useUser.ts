import React from 'react';
import { UserContext } from '~/context/UserContext';

export const useUser = () => {
  const context = React.useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserContextProvider');
  }
  return context;
};
