import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Category } from '~/@types/types';

export const useLoadImage = (category: Category) => {
  const supabaseClient = useSupabaseClient();

  if (!category) return null;

  const { data: imageData } = supabaseClient.storage
    .from('images')
    .getPublicUrl(category.image_path);

  return imageData?.publicUrl;
};
