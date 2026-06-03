import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Cached client — for list queries on homepage/sitemap (safe to cache, no single-row lookups)
export function getServerSupabase() {
  return createClient(SUPABASE_URL, SUPABASE_KEY, {
    global: {
      fetch: (url, options) =>
        fetch(url, {
          ...options,
          next: { revalidate: 86400 },
        }),
    },
  })
}

// No-cache client — for single post lookups where a cached notFound() would
// cause posts to 404 for up to 24h after first being published
export function getFreshSupabase() {
  return createClient(SUPABASE_URL, SUPABASE_KEY, {
    global: {
      fetch: (url, options) =>
        fetch(url, { ...options, cache: 'no-store' }),
    },
  })
}
