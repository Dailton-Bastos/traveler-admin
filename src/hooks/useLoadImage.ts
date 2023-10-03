import { useSupabaseClient } from '@supabase/auth-helpers-react';

export const useLoadImage = (image_path: string | undefined) => {
  const supabaseClient = useSupabaseClient();

  if (!image_path) return null;

  const { data: imageData } = supabaseClient.storage
    .from('images')
    .getPublicUrl(image_path);

  return imageData?.publicUrl;
};
