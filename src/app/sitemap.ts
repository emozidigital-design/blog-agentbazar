import type { MetadataRoute } from 'next'
import { getServerSupabase } from '@/lib/supabase-server'

const BASE_URL = 'https://blog.agentbazar.in'

const homepage: MetadataRoute.Sitemap[0] = {
  url: BASE_URL,
  lastModified: new Date(),
  changeFrequency: 'daily',
  priority: 1,
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const { data: posts } = await getServerSupabase()
      .from('blog_posts')
      .select('slug, published_date')
      .eq('status', 'published')
      .order('published_date', { ascending: false })

    const postUrls: MetadataRoute.Sitemap = (posts ?? []).map(post => ({
      url: `${BASE_URL}/${post.slug}`,
      lastModified: new Date(post.published_date),
      changeFrequency: 'monthly',
      priority: 0.8,
    }))

    return [homepage, ...postUrls]
  } catch {
    return [homepage]
  }
}
