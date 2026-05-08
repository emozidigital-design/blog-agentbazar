import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import SinglePost from './SinglePost'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt, cover_image, seo_title, seo_description, og_title, og_description, canonical_url, slug')
    .eq('slug', params.slug)
    .single()

  if (!post) return { title: 'Post Not Found | AgentBazar Blog' }

  return {
    title: post.seo_title || `${post.title} | AgentBazar Blog`,
    description: post.seo_description || post.excerpt,
    openGraph: {
      title: post.og_title || post.title,
      description: post.og_description || post.excerpt,
      images: post.cover_image ? [{ url: post.cover_image }] : [],
      type: 'article',
    },
    alternates: {
      canonical: post.canonical_url || `https://blog.agentbazar.in/${post.slug}`,
    },
  }
}

export default function Page({ params }: Props) {
  return <SinglePost slug={params.slug} />
}
