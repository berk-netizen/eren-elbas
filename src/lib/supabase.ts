import { createClient } from '@supabase/supabase-js';

// Use env vars in production (set in Vercel dashboard), fallback to real project values for builds without env vars configured.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tbjwfzkiliczbsggrwsz.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiandmemtpbGljemJzZ2dyd3N6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0NzA4NjQsImV4cCI6MjA1NjA0Njg2NH0.bpAqOovf8yg7hkKx0LBJMQ-FGa6mNVnuTPZ5iuF3w9Y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
