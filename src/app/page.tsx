'use client'
import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase, Post, CATEGORIES, formatDate, readTime } from '@/lib/supabase'
import Header from '@/components/Header'
import HeroPost from '@/components/HeroPost'
import PostCard from '@/components/PostCard'
import Footer from '@/components/Footer'

const POSTS_PER_PAGE = 9

function BlogContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const urlCat = searchParams.get('category') || 'All'
  const urlSearch = searchParams.get('search') || ''

  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState(urlCat)
  const [searchQuery, setSearchQuery] = useState(urlSearch)

  const fetchPosts = useCallback(async (cat: string, search: string, pg: number) => {
    setLoading(true)
    setError(null)
    try {
      let query = supabase
        .from('blog_posts')
        .select('*', { count: 'exact' })
        .eq('status', 'published')
        .order('published_date', { ascending: false })

      if (cat && cat !== 'All') query = query.ilike('category', `%${cat}%`)
      if (search) query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`)

      const from = (pg - 1) * POSTS_PER_PAGE
      query = query.range(from, from + POSTS_PER_PAGE - 1)

      const { data, count, error } = await query
      if (error) throw error
      setPosts((data as Post[]) || [])
      setTotal(count || 0)
    } catch (err) {
      console.error(err)
      setError('Failed to load posts. Please try again.')
      setPosts([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    setActiveCategory(urlCat)
    setSearchQuery(urlSearch)
    setPage(1)
  }, [urlCat, urlSearch])

  useEffect(() => {
    fetchPosts(activeCategory, searchQuery, page)
  }, [activeCategory, searchQuery, page, fetchPosts])

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
    setPage(1)
    const params = new URLSearchParams()
    if (cat !== 'All') params.set('category', cat)
    router.push(`/?${params.toString()}`)
  }

  const totalPages = Math.ceil(total / POSTS_PER_PAGE)
  const heroPost = posts[0] || null
  const gridPosts = posts.slice(1)

  const renderPagination = () => {
    if (totalPages <= 1) return null
    const pages: (number | string)[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (page > 3) pages.push('...')
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i)
      if (page < totalPages - 2) pages.push('...')
      pages.push(totalPages)
    }

    return (
      <div className="pagination">
        <button className="page-btn" onClick={() => setPage(p => p - 1)} disabled={page === 1}>‹</button>
        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`dots-${i}`} style={{ padding: '0 4px', color: '#aaa' }}>…</span>
          ) : (
            <button key={p} className={`page-btn${page === p ? ' active' : ''}`} onClick={() => setPage(Number(p))}>
              {p}
            </button>
          )
        )}
        <button className="page-btn" onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>›</button>
      </div>
    )
  }

  return (
    <>
      <Header activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

      <main>
        <div className="page-wrap">
          {activeCategory === 'All' && !searchQuery && (
            <div className="blog-hero">
              <h1>Travel Industry Insights & News</h1>
              <p>Visa updates, aviation trends, and expert tips for B2B travel professionals.</p>
            </div>
          )}

          {(activeCategory !== 'All' || searchQuery) && (
            <div className="blog-hero" style={{ paddingBottom: 24 }}>
              <h1>{searchQuery ? `Search: "${searchQuery}"` : activeCategory}</h1>
              <p>{total} article{total !== 1 ? 's' : ''} found</p>
            </div>
          )}

        </div>

        <div className="page-wrap">
          {loading ? (
            <SkeletonLoader />
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#6b7a8d' }}>
              <p style={{ fontSize: '1.1rem' }}>{error}</p>
              <button
                onClick={() => fetchPosts(activeCategory, searchQuery, page)}
                style={{ marginTop: 16, color: '#1A4FA0', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}
              >
                Try again
              </button>
            </div>
          ) : posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#6b7a8d' }}>
              <p style={{ fontSize: '1.1rem' }}>No posts found.</p>
            </div>
          ) : (
            <>
              {heroPost && page === 1 && !searchQuery && (
                <div style={{ marginBottom: 40 }}>
                  <div className="section-label">Featured</div>
                  <HeroPost post={heroPost} />
                </div>
              )}

              {gridPosts.length > 0 && (
                <>
                  <div className="section-label">
                    {searchQuery ? 'Results' : activeCategory === 'All' ? 'Latest Articles' : activeCategory}
                  </div>
                  <div className="post-grid">
                    {(page === 1 && !searchQuery ? gridPosts : posts).map(post => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                </>
              )}

              {renderPagination()}
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}

function SkeletonLoader() {
  return (
    <div>
      <div className="skeleton" style={{ height: 420, borderRadius: 20, marginBottom: 40 }} />
      <div className="post-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="post-card" style={{ minHeight: 360 }}>
            <div className="skeleton" style={{ height: 200 }} />
            <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="skeleton" style={{ height: 16, width: '40%' }} />
              <div className="skeleton" style={{ height: 20, width: '90%' }} />
              <div className="skeleton" style={{ height: 20, width: '75%' }} />
              <div className="skeleton" style={{ height: 14, width: '50%' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function BlogPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: 'center', color: '#aaa' }}>Loading...</div>}>
      <BlogContent />
    </Suspense>
  )
}
