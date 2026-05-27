'use client'

import Link from 'next/link'
import Image from 'next/image'
import { CATEGORIES } from '@/lib/supabase'
import { useState } from 'react'

export default function Footer() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Something went wrong')
      setSubmitted(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="site-footer">
      <div className="footer-inner">

        {/* ── Cols 1+2: Brand + Form (single card spanning 2 columns) ── */}
        <div style={{
          gridColumn: 'span 2',
          position: 'relative',
          backgroundColor: 'white',
          borderRadius: '12px',
          color: '#1a2332',
          overflow: 'hidden',
          padding: '28px 32px',
          display: 'flex',
          gap: '32px',
          alignItems: 'flex-start',
        }}>
          {/* Background image overlay */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80")',
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: 0.12, zIndex: 0,
          }} />

          {/* Brand info */}
          <div style={{ position: 'relative', zIndex: 1, flex: '1 1 0', minWidth: 0 }}>
            <Image src="/ab-logo.png" alt="AgentBazar" width={120} height={36} style={{ height: 36, width: 'auto', objectFit: 'contain', marginBottom: '14px' }} />
            <p style={{ lineHeight: '1.7', marginBottom: '16px', fontWeight: 500, fontSize: '13.5px' }}>
              Agent Bazar Blogs delivers the latest aviation news, visa updates, fare trends, and travel industry insights for travel agents across India.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="https://www.instagram.com/agentbazarblogs/" target="_blank" rel="noreferrer" style={{ color: '#6b7a8d', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#F47920'} onMouseLeave={e => e.currentTarget.style.color = '#6b7a8d'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.facebook.com/people/Agentbazarblogs/" target="_blank" rel="noreferrer" style={{ color: '#6b7a8d', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#F47920'} onMouseLeave={e => e.currentTarget.style.color = '#6b7a8d'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://x.com/AgentBazar" target="_blank" rel="noreferrer" style={{ color: '#6b7a8d', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#F47920'} onMouseLeave={e => e.currentTarget.style.color = '#6b7a8d'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div style={{ position: 'relative', zIndex: 1, width: '1px', alignSelf: 'stretch', background: 'rgba(26,79,160,0.1)', flexShrink: 0 }} />

          {/* Subscribe form */}
          <div style={{ position: 'relative', zIndex: 1, flex: '1 1 0', minWidth: 0 }}>
            <h5 style={{ fontSize: '14px', fontWeight: 700, color: '#1A4FA0', marginBottom: '16px' }}>
              Get daily travel &amp; flights updates
            </h5>
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid rgba(26,79,160,0.15)', background: 'rgba(255,255,255,0.9)', fontSize: '14px', color: '#1a2332', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => e.currentTarget.style.borderColor = '#F47920'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(26,79,160,0.15)'}
                />
                <input
                  type="email"
                  placeholder="Work email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid rgba(26,79,160,0.15)', background: 'rgba(255,255,255,0.9)', fontSize: '14px', color: '#1a2332', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => e.currentTarget.style.borderColor = '#F47920'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(26,79,160,0.15)'}
                />
                {error && <p style={{ color: '#e53e3e', fontSize: '12px', margin: 0 }}>{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'linear-gradient(135deg, #F47920 0%, #ff9547 100%)', color: 'white', border: 'none', fontWeight: 700, fontSize: '14px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.8 : 1, transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(244,121,32,0.3)' }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  {loading ? 'Subscribing…' : 'Subscribe'}
                </button>
              </form>
            ) : (
              <div style={{ background: 'rgba(244,121,32,0.08)', border: '1px solid rgba(244,121,32,0.2)', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
                <p style={{ color: '#F47920', fontWeight: 700, marginBottom: '4px', fontSize: '14px' }}>You&apos;re subscribed!</p>
                <p style={{ color: '#6b7a8d', fontSize: '13px', margin: 0 }}>Thanks for joining — check your inbox soon.</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Col 3: Categories ── */}
        <div className="footer-col">
          <h4>Categories</h4>
          {CATEGORIES.filter(c => c !== 'All').slice(0, 6).map(cat => (
            <Link key={cat} href={`/?category=${encodeURIComponent(cat)}`}>{cat}</Link>
          ))}
        </div>

        {/* ── Col 4: Links ── */}
        <div className="footer-col">
          <h4>Links</h4>
          <Link href="/">Blog Home</Link>
          <Link href="https://agentbazar.in" target="_blank">AgentBazar</Link>
          <Link href="https://agentbazar.in/contact" target="_blank">Contact</Link>
        </div>

      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} AgentBazar. All rights reserved.</span>
      </div>
    </footer>
  )
}
