import { createClient } from '@supabase/supabase-js';
import type { Database } from '~/@types/supabase';

const PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const PROJECT_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabaseAdmin = createClient<Database>(
  PROJECT_URL,
  PROJECT_ANON_KEY
);
