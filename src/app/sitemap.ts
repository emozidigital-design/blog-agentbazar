import type { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, published_date')
    .eq('status', 'published')
    .order('published_date', { ascending: false })

  const postUrls: MetadataRoute.Sitemap = (posts || []).map(post => ({
    url: `https://blog.agentbazar.in/${post.slug}`,
    lastModified: new Date(post.published_date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: 'https://blog.agentbazar.in',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...postUrls,
  ]
}
