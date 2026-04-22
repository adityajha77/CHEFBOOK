import { createClient } from '@supabase/supabase-js';

// Ensure you have these variables matching exactly in your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase credentials missing. Check your .env file.");
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);
