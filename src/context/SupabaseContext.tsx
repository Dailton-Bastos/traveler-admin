'use client';

import React from 'react';

import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '~/@types/supabase';

interface SupabaseContextProps {
  children: React.ReactNode;
}

export const SupabaseProvider = ({ children }: SupabaseContextProps) => {
  const [supabaseClient] = React.useState(() => {
    return createClientComponentClient<Database>();
  });

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
};
