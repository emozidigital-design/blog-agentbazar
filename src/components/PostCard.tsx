'use client'
import Link from 'next/link'
import { PostSummary, formatDate } from '@/lib/supabase'

const Fallback = () => (
  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1A4FA0 0%, #0d1b2e 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>✈️</div>
)

export default function PostCard({ post }: { post: PostSummary }) {
  return (
    <Link href={`/${post.slug}`} style={{ textDecoration: 'none' }}>
      <article className="post-card">
        <div className="post-card-img">
          {post.cover_image ? (
            <img
              src={post.cover_image}
              alt={post.title}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
            />
          ) : (
            <Fallback />
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
              <span>{post.read_time ?? 1} min</span>
            </div>
            <span className="card-read">Read →</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
