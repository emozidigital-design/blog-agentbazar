import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServerSupabase } from '@/lib/supabase-server'
import { Post, formatDate, readTime } from '@/lib/supabase'
import SinglePostShell from './SinglePostShell'

interface Props {
  params: Promise<{ slug: string }>
}

export const revalidate = 300 // re-generate stale pages every 5 minutes

export async function generateStaticParams() {
  const { data } = await getServerSupabase()
    .from('blog_posts')
    .select('slug')
    .eq('status', 'published')
    .order('published_date', { ascending: false })
    .limit(500)
  return (data ?? []).map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data: post } = await getServerSupabase()
    .from('blog_posts')
    .select('title, excerpt, cover_image, seo_title, seo_description, og_title, og_description, canonical_url, slug')
    .eq('slug', slug)
    .single()

  if (!post) return { title: 'Post Not Found | AgentBazar Blog' }

  const optimizedImageUrl = post.cover_image
    ? `https://blog.agentbazar.in/_next/image?url=${encodeURIComponent(post.cover_image)}&w=1200&q=80`
    : null

  const ogImages = optimizedImageUrl
    ? [{ url: optimizedImageUrl, width: 1200, height: 630, alt: post.title }]
    : []

  return {
    title: post.seo_title || `${post.title} | AgentBazar Blog`,
    description: post.seo_description || post.excerpt,
    openGraph: {
      title: post.og_title || post.title,
      description: post.og_description || post.excerpt,
      images: ogImages,
      type: 'article',
      siteName: 'AgentBazar Blog',
      url: post.canonical_url || `https://blog.agentbazar.in/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.og_title || post.title,
      description: post.og_description || post.excerpt,
      images: optimizedImageUrl ? [optimizedImageUrl] : [],
    },
    alternates: {
      canonical: post.canonical_url || `https://blog.agentbazar.in/${post.slug}`,
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params

  const [{ data: post }, { data: recentData }] = await Promise.all([
    getServerSupabase()
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single(),
    getServerSupabase()
      .from('blog_posts')
      .select('title, slug, published_date, cover_image, category')
      .eq('status', 'published')
      .order('published_date', { ascending: false })
      .neq('slug', slug)
      .limit(3),
  ])

  if (!post) notFound()

  return (
    <SinglePostShell
      post={post as Post}
      recentPosts={(recentData ?? []) as Post[]}
    />
  )
}
