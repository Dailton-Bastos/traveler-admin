import { cookies } from 'next/headers';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import type { Category } from '~/@types/types';

export const getCategoryById = async (id: string): Promise<Category[]> => {
  const supabase = createServerComponentClient({ cookies });

  if (!id) return [];

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id);

  if (error) console.error(error);

  return (data as Category[]) || [];
};
