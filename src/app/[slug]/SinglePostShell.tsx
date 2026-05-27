import Link from 'next/link'
import { Post, formatDate, readTime } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SinglePostClient from './SinglePostClient'

interface Props {
  post: Post
  recentPosts: Post[]
}

export default function SinglePostShell({ post, recentPosts }: Props) {
  const mins = post.read_time ?? readTime(post.content)
  const tags = Array.isArray(post.tags) ? post.tags : []

  return (
    <>
      <Header activeCategory={post.category || 'All'} />

      <div className="single-layout">
        <article className="single-main">
          <nav style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6b7a8d' }}>
            <Link href="/" style={{ color: '#6b7a8d', textDecoration: 'none' }}>Blog</Link>
            <span>›</span>
            {post.category && (
              <>
                <Link href={`/?category=${encodeURIComponent(post.category)}`} style={{ color: '#6b7a8d', textDecoration: 'none' }}>{post.category}</Link>
                <span>›</span>
              </>
            )}
            <span style={{ color: '#1a2332' }}>
              {(post.title?.length ?? 0) > 40 ? `${post.title.substring(0, 40)}…` : post.title}
            </span>
          </nav>

          <header className="post-header">
            {post.category && <div className="post-header-cat">{post.category}</div>}
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta-row">
              <span>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                {post.author || 'AgentBazar Editorial Team'}
              </span>
              <span>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                </svg>
                {formatDate(post.published_date)}
              </span>
              <span>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                {mins} min read
              </span>
            </div>
          </header>

          {post.cover_image && (
            <div className="post-cover">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.cover_image} alt={post.title} />
            </div>
          )}

          {/* Client component handles: content sanitization, TOC, share buttons, FABs */}
          <SinglePostClient post={post} />

          {tags.length > 0 && (
            <div className="post-tags">
              {tags.map((tag, i) => (
                <span key={i} className="post-tag">#{tag}</span>
              ))}
            </div>
          )}

          <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1.5px solid #e8ecf2' }}>
            <Link href="/" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              color: '#1A4FA0', fontWeight: 600, fontSize: 14, textDecoration: 'none'
            }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to Blog
            </Link>
          </div>
        </article>

        <aside className="single-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
          {recentPosts.length > 0 && (
            <div style={{ background: '#f4f6f9', borderRadius: 16, padding: 24, border: '1.5px solid #e8ecf2' }}>
              <div style={{ fontFamily: 'sans-serif', fontSize: 14, fontWeight: 700, textTransform: 'uppercase', marginBottom: 16, letterSpacing: '0.06em', color: '#0f1923' }}>Recent Articles</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {recentPosts.map(rp => (
                  <Link key={rp.slug} href={`/${rp.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: 12, alignItems: 'center' }}>
                    {rp.cover_image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={rp.cover_image} alt={rp.title} style={{ width: 64, height: 64, borderRadius: 8, objectFit: 'cover' }} />
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, color: '#1A4FA0', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>{rp.category}</div>
                      <div style={{ fontSize: 13.5, fontWeight: 700, lineHeight: 1.3, color: '#0f1923', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{rp.title}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="sidebar-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/new-logo.jpg" alt="AgentBazar" className="about-logo" />
            <div className="sidebar-card-title">About the Agent Bazar Blog</div>
            <p className="about-text">
              The Agent Bazar Blog is your trusted source for industry news, airfare trends, visa updates, and insights tailored for B2B travel agents, consolidators, corporate travel planners, and tour operators.
            </p>
            <p className="about-text" style={{ marginTop: 12 }}>
              Our goal is to support travel professionals with timely, actionable content that enhances business growth, improves efficiency, and keeps you informed in a fast-paced environment.
            </p>
            <Link href="https://agentbazar.in/contact" target="_blank" className="get-in-touch-btn">
              Get In Touch
            </Link>
          </div>

          {/* TOC and FABs are rendered client-side since they need DOM/interactivity */}
          <SinglePostClient post={post} sidebarOnly />
        </aside>
      </div>

      <Footer />
    </>
  )
}
