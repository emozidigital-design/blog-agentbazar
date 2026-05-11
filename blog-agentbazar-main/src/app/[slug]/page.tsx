'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { supabase, Post, formatDate, readTime } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DOMPurify from 'isomorphic-dompurify'

interface TocItem {
  id: string
  text: string
  level: number
}

function buildToc(html: string): TocItem[] {
  if (typeof window === 'undefined') return []
  const div = document.createElement('div')
  div.innerHTML = html
  const headings = div.querySelectorAll('h2, h3')
  const items: TocItem[] = []
  headings.forEach((h, i) => {
    const text = h.textContent?.trim() || ''
    if (text) {
      items.push({ id: `heading-${i}`, text, level: parseInt(h.tagName[1]) })
    }
  })
  return items
}

function injectHeadingIds(html: string): string {
  let count = 0
  return html.replace(/<(h[23])(.*?)>/gi, (_match, tag, attrs) => {
    return `<${tag}${attrs} id="heading-${count++}">`
  })
}

export default function SinglePost() {
  const params = useParams()
  const slug = params?.slug as string
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [toc, setToc] = useState<TocItem[]>([])
  const [copied, setCopied] = useState(false)
  const [processedContent, setProcessedContent] = useState('')

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single()
      .then(({ data, error }) => {
        if (error || !data) { setLoading(false); return }
        setPost(data as Post)

        const withIds = injectHeadingIds(data.content || '')
        setProcessedContent(withIds)

        const tocItems = buildToc(data.content || '')
        setToc(tocItems)
        setLoading(false)
      })
  }, [slug])

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsApp = () => {
    const text = `Check this out: ${post?.title} - ${window.location.href}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="single-layout">
          <div>
            <div className="skeleton" style={{ height: 56, marginBottom: 24, borderRadius: 12 }} />
            <div className="skeleton" style={{ height: 480, borderRadius: 16, marginBottom: 32 }} />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 18, marginBottom: 12, width: `${85 - i * 5}%` }} />
            ))}
          </div>
          <div>
            <div className="skeleton" style={{ height: 280, borderRadius: 16 }} />
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (!post) {
    return (
      <>
        <Header />
        <div style={{ padding: '80px 24px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', marginBottom: 16 }}>Post not found</h1>
          <Link href="/" style={{ color: '#1A4FA0', fontWeight: 600, textDecoration: 'none' }}>← Back to Blog</Link>
        </div>
        <Footer />
      </>
    )
  }

  const mins = readTime(post.content)
  const tags = Array.isArray(post.tags) ? post.tags : []

  return (
    <>
      <Header />

      <div className="single-layout">
        {/* MAIN CONTENT */}
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
            <span style={{ color: '#1a2332' }}>{post.title?.substring(0, 40)}...</span>
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
              <img src={post.cover_image} alt={post.title} onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
            </div>
          )}

          {/* CLEANED CONTENT FROM FIXED CSV */}
          <div className="article-body" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(processedContent) }} />

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

        {/* SIDEBAR – TOC + SHARE */}
        <aside className="single-sidebar">
          {toc.length > 0 && (
            <div className="toc-box">
              <div className="toc-title">Table of Contents</div>
              <ul className="toc-list">
                {toc.map(item => (
                  <li key={item.id} style={{ paddingLeft: item.level === 3 ? 12 : 0 }}>
                    <a href={`#${item.id}`}>{item.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="share-box">
            <div className="share-title">Share Article</div>
            <button className="share-btn copy" onClick={handleCopy}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            <button className="share-btn whatsapp" onClick={handleWhatsApp}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Share on WhatsApp
            </button>
          </div>
        </aside>
      </div>

      <Footer />
    </>
  )
}
