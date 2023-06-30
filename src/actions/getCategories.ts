import { cookies } from 'next/headers';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import type { Category } from '~/@types/types';

export const getCategories = async (): Promise<Category[]> => {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) console.error(error);

  return (data as Category[]) || [];
};
