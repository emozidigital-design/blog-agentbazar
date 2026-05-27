import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Server-only client — used in Server Components and generateStaticParams.
// Do NOT import this in 'use client' files.
export function getServerSupabase() {
  return createClient(SUPABASE_URL, SUPABASE_KEY, {
    global: {
      fetch: (url, options) =>
        fetch(url, {
          ...options,
          next: { revalidate: 300 }, // cache Supabase responses for 5 minutes
        }),
    },
  })
}
