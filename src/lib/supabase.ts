import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://pxbqfbbzxxvwthygiihx.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4YnFmYmJ6eHh2d3RoeWdpaWh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MDYwNjksImV4cCI6MjA5MTM4MjA2OX0.V8hKF3njtera0ElhWiFqCsu8n1nLPdMs29rFvANJDEI'

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

// FIX: Parse date without timezone conversion
export function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  try {
    const [year, month, day] = dateStr.split('T')[0].split('-')
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`
  } catch {
    return ''
  }
}

export function readTime(content: string): number {
  if (!content) return 1
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}
