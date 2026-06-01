'use client'
import Link from 'next/link'
import Image from 'next/image'
import { PostSummary, formatDate } from '@/lib/supabase'

export default function HeroPost({ post }: { post: PostSummary }) {
  return (
    <Link href={`/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <article className="hero-post">
        <div className="hero-post-img">
          {post.cover_image ? (
            <Image src={post.cover_image} alt={post.title} fill sizes="(max-width:1024px) 100vw, 50vw" style={{ objectFit: 'cover' }} priority />
          ) : (
            <div style={{ width: '100%', height: '100%', minHeight: '420px', background: 'linear-gradient(135deg, #1A4FA0 0%, #0d1b2e 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>✈️</div>
          )}
        </div>
        <div className="hero-post-body">
          {post.category && <span className="hero-cat-badge">{post.category}</span>}
          <h2 className="hero-post-title">{post.title}</h2>
          {post.excerpt && <p className="hero-post-excerpt">{post.excerpt}</p>}
          <div className="hero-post-meta">
            <span>{formatDate(post.published_date)}</span>
            <span>·</span>
            <span>{post.read_time ?? 1} min read</span>
          </div>
          <span className="hero-read-link">Read article →</span>
        </div>
      </article>
    </Link>
  )
}
