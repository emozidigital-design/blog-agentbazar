'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Post, formatDate, readTime } from '@/lib/supabase'

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/${post.slug}`} style={{ textDecoration: 'none' }}>
      <article className="post-card">
        <div className="post-card-img">
          {post.cover_image ? (
            <Image src={post.cover_image} alt={post.title} fill sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1A4FA0 0%, #0d1b2e 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>✈️</div>
          )}
        </div>
        <div className="post-card-body">
          {post.category && <span className="card-cat">{post.category}</span>}
          <h2 className="card-title">{post.title}</h2>
          {post.excerpt && <p className="card-excerpt">{post.excerpt}</p>}
          <div className="card-footer">
            <div className="card-meta">
              <span>{formatDate(post.published_date)}</span>
              <span>·</span>
              <span>{post.read_time ?? readTime(post.content)} min</span>
            </div>
            <span className="card-read">Read →</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
