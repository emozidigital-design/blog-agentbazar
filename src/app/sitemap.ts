import type { MetadataRoute } from 'next'

const BASE_URL = 'https://blog.agentbazar.in'

const homepage: MetadataRoute.Sitemap[0] = {
  url: BASE_URL,
  lastModified: new Date(),
  changeFrequency: 'daily',
  priority: 1,
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return [homepage]
  }

  try {
    const { createClient } = await import('@supabase/supabase-js')
    const client = createClient(supabaseUrl, supabaseKey)

    const { data: posts } = await client
      .from('blog_posts')
      .select('slug, published_date')
      .eq('status', 'published')
      .order('published_date', { ascending: false })

    const postUrls: MetadataRoute.Sitemap = (posts || []).map(post => ({
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
