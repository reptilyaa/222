import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Animal {
  id: string;
  name: string;
  age: number;
  breed: string;
  description: string;
  image_url: string;
  status: 'available' | 'adopted';
  created_at: string;
}

export interface Application {
  id: string;
  animal_id: string;
  name: string;
  phone: string;
  comment: string;
  created_at: string;
}
