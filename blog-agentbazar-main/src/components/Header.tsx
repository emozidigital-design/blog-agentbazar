'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CATEGORIES } from '@/lib/supabase'

export default function Header({ activeCategory = 'All', onCategoryChange }: any) {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) router.push(`/?search=${encodeURIComponent(query.trim())}`)
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="header-logo">
          <img src="/logo.svg" alt="AgentBazar" style={{ filter: 'brightness(0) invert(1)' }} />
        </Link>
        <form className="header-search" onSubmit={handleSearch}>
          <input type="text" placeholder="Search..." value={query} onChange={e => setQuery(e.target.value)} />
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
            <button key={cat} className={`cat-strip-btn${activeCategory === cat ? ' active' : ''}`} onClick={() => onCategoryChange(cat)}>
              {cat}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
