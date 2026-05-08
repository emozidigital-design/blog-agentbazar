import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export interface Post {
  id: string
  slug: string
  title: string
  content: string
  excerpt: string
  seo_title: string
  seo_description: string
  focus_keyword: string
  cover_image: string
  og_title: string
  og_description: string
  category: string
  tags: string[]
  author: string
  status: string
  canonical_url: string
  published_date: string
  source: string
}

export const CATEGORIES = [
  'All',
  'Aviation',
  'Visa Updates',
  'Travel Tips',
  'Industry News',
  'Industry Trends',
  'Travel Tools',
  'Cruise',
  'Top Sectors',
  'New Launches',
  'Events & Expo',
]

export function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  try {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(dateStr))
  } catch {
    return ''
  }
}

export function readTime(content: string): number {
  if (!content) return 1
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}
