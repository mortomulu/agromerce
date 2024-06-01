export const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
    'Access-Control-Allow-Headers': `Bearer ${process.env.NEXT_SECRET_SUPABASE_ANON_KEY}`,
    'Access-Control-Allow-Credentials': true
  }