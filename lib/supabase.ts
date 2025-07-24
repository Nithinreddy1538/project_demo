import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only create Supabase client if environment variables are properly configured
export const supabase = supabaseUrl && supabaseKey && supabaseUrl !== 'https://your-project-ref.supabase.co' 
  ? createClient(supabaseUrl, supabaseKey)
  : null;