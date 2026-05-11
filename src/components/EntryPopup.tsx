'use client'
import { useState, useEffect } from 'react'

const POPUP_KEY = 'b2b_popup_dismissed'
const DISMISS_DAYS = 7 // show again after 7 days

export default function EntryPopup() {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem(POPUP_KEY)
    if (raw) {
      const ts = Number(raw)
      const daysElapsed = (Date.now() - ts) / (1000 * 60 * 60 * 24)
      if (daysElapsed < DISMISS_DAYS) return
    }
    // Slight delay so page content renders first
    const t = setTimeout(() => setVisible(true), 900)
    return () => clearTimeout(t)
  }, [])

  const dismiss = () => {
    setClosing(true)
    setTimeout(() => {
      setVisible(false)
      setClosing(false)
      localStorage.setItem(POPUP_KEY, String(Date.now()))
    }, 400)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    // Simulate async (replace with real API call)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setSubmitted(true)
    setTimeout(dismiss, 2200)
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
          directly to your inbox — trusted by <strong>4,000+ travel professionals</strong>.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="popup-form" noValidate>
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
            <button type="submit" className="popup-cta" disabled={loading}>
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
