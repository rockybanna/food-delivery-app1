const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
)

async function getUser() {
  const { data } = await supabase.auth.getUser()
  return data.user
}
