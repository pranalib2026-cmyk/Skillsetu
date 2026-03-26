import { createClient } from '@supabase/supabase-js';

// Fallback to empty strings to prevent build errors if env vars aren't set
// In a real scenario, you'd throw an error if these are missing.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Since we don't have real Supabase credentials yet, we are exporting a flag
 * so our services can choose to use local mock data instead of calling Supabase.
 */
export const IS_MOCK_MODE = import.meta.env.VITE_SUPABASE_URL === undefined;
