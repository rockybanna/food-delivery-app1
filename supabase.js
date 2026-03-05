// Create a Supabase client using the CDN library loaded in index.html

const client = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
