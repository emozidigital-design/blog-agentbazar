'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { CATEGORIES } from '@/lib/supabase'

const MAX_SEARCH_LENGTH = 100

interface HeaderProps {
  activeCategory?: string
  onCategoryChange?: (category: string) => void
  initialQuery?: string
}

export default function Header({ activeCategory: propCategory = 'All', onCategoryChange = () => {}, initialQuery = '' }: HeaderProps) {
  const [query, setQuery] = useState(initialQuery)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => { setQuery(initialQuery) }, [initialQuery])
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 60)
      
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY.current) {
          setHidden(true)
        } else {
          setHidden(false)
        }
      } else {
        setHidden(false)
      }
      lastScrollY.current = currentScrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // On the homepage, derive active category from URL so it updates immediately after navigation.
  // On blog post pages (non-root paths), no category is active.
  const activeCategory = pathname === '/'
    ? (searchParams.get('category') || 'All')
    : 'All'

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed || trimmed.length > MAX_SEARCH_LENGTH) return
    router.push(`/?search=${encodeURIComponent(trimmed)}`)
  }

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}${hidden ? ' header-hidden' : ''}`}>

      <div className="header-inner">
        <Link href="/" className="header-logo" style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/new-logo.jpg"
            alt="AgentBazar"
            height={60}
            width={180}
            className="logo-img"
            priority
          />
        </Link>
        <form className="header-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={query}
            maxLength={MAX_SEARCH_LENGTH}
            onChange={e => setQuery(e.target.value)}
          />
          <button type="submit" aria-label="Search">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
        </form>
      </div>
      <div className="cat-strip">
        <div className="cat-strip-inner">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`cat-strip-btn${activeCategory === cat ? ' active' : ''}`}
              onClick={() => {
                onCategoryChange(cat)
                const params = new URLSearchParams()
                if (cat !== 'All') params.set('category', cat)
                router.push(`/?${params.toString()}`)
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
