'use client'
import { useState, useEffect } from 'react'

const POPUP_SEEN_KEY = 'ab_popup_seen'
const markPopupSeen = () => localStorage.setItem(POPUP_SEEN_KEY, '1')

export default function EntryPopup() {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (localStorage.getItem(POPUP_SEEN_KEY)) return
    const t = setTimeout(() => setVisible(true), 900)
    return () => clearTimeout(t)
  }, [])

  const dismiss = () => {
    if (loading) return
    markPopupSeen()
    setClosing(true)
    setTimeout(() => {
      setVisible(false)
      setClosing(false)
    }, 400)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim() || !email.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fullName, email }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Something went wrong')
      markPopupSeen()
      setSubmitted(true)
      setTimeout(dismiss, 2200)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!visible) return null

  return (
    <div
      className={`popup-backdrop ${closing ? 'popup-backdrop--out' : 'popup-backdrop--in'}`}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss() }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="popup-title"
    >
      <div className={`popup-card ${closing ? 'popup-card--out' : 'popup-card--in'}`}>
        {/* Close button */}
        <button className="popup-close" onClick={dismiss} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Left accent bar */}
        <div className="popup-accent-bar" />

        <h2 id="popup-title" className="popup-title">
          Stay Ahead in<br />
          <span className="popup-title-highlight">B2B Travel</span>
        </h2>

        <p className="popup-desc">
          Get visa updates, airline fare alerts, and expert strategies delivered
          directly to your inbox — trusted by <strong>4,200+ travel professionals</strong>.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="popup-form" noValidate>
            <div className="popup-input-wrap" style={{ marginBottom: '12px' }}>
              <svg className="popup-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#6b7a8d" strokeWidth="1.8" strokeLinecap="round"/>
                <circle cx="12" cy="7" r="4" stroke="#6b7a8d" strokeWidth="1.8"/>
              </svg>
              <input
                type="text"
                className="popup-input"
                placeholder="Full name"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
                autoComplete="name"
                id="popup-name"
              />
            </div>
            <div className="popup-input-wrap">
              <svg className="popup-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#6b7a8d" strokeWidth="1.8" strokeLinecap="round"/>
                <polyline points="22,6 12,13 2,6" stroke="#6b7a8d" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <input
                type="email"
                className="popup-input"
                placeholder="Enter your work email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                id="popup-email"
              />
            </div>
            {error && (
              <p style={{ color: '#e53e3e', fontSize: '13px', margin: '8px 0 0', textAlign: 'center' }}>{error}</p>
            )}
            <button type="submit" className="popup-cta" disabled={loading} style={{ marginTop: '16px' }}>
              {loading ? (
                <span className="popup-spinner" />
              ) : (
                <>
                  Subscribe
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
            <p className="popup-privacy">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#6b7a8d" strokeWidth="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#6b7a8d" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              No spam. Unsubscribe anytime.
            </p>
          </form>
        ) : (
          <div className="popup-success">
            <div className="popup-success-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#F47920" opacity="0.15"/>
                <path d="M7 12l4 4 6-7" stroke="#F47920" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="popup-success-text">You&apos;re in! Check your inbox soon.</p>
          </div>
        )}

        {/* Social proof strip */}
        <div className="popup-social-proof">
          <div className="popup-avatars">
            {['#1A4FA0','#F47920','#001D4A','#6b7a8d'].map((c, i) => (
              <div key={i} className="popup-avatar" style={{ background: c, zIndex: 4 - i }}>
                {String.fromCharCode(65 + i * 3)}
              </div>
            ))}
          </div>
          <span>Joined by <strong>4,200+</strong> travel professionals</span>
        </div>
      </div>
    </div>
  )
}
