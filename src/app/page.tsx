import { getServerSupabase } from '@/lib/supabase-server'
import { PostSummary } from '@/lib/supabase'
import BlogPage from './BlogClient'

export const revalidate = 86400 // re-fetch homepage data every 24 hours (new posts trigger /api/revalidate on publish)

const POSTS_PER_PAGE = 9

export default async function Page() {
  const { data, count } = await getServerSupabase()
    .from('blog_posts')
    .select('id, slug, title, excerpt, cover_image, category, published_date, read_time', { count: 'exact' })
    .eq('status', 'published')
    .order('published_date', { ascending: false })
    .range(0, POSTS_PER_PAGE - 1)

  return (
    <BlogPage
      initialPosts={(data ?? []) as PostSummary[]}
      initialTotal={count ?? 0}
    />
  )
}
