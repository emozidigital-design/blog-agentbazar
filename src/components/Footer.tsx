'use client'

import Link from 'next/link'
import { CATEGORIES } from '@/lib/supabase'
import { useState } from 'react'

export default function Footer() {
  const [showPopup, setShowPopup] = useState(false)

  return (
    <>
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div style={{ position: 'relative', padding: '24px', borderRadius: '12px', color: '#1a2332', backgroundColor: 'white', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.15,
                zIndex: 0
              }} />
              
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
                <div style={{ flex: 1 }}>
                  <img src="/ab-logo.png" alt="AgentBazar" style={{ height: 36, width: 'auto', objectFit: 'contain', marginBottom: '14px' }} />
                  <p style={{ lineHeight: '1.7', maxWidth: '800px', marginBottom: '16px', fontWeight: 500 }}>Agent Bazar Blogs delivers the latest aviation news, visa updates, fare trends, and travel industry insights for travel agents across India. Stay informed with real-time updates, expert tips, and important travel developments from the B2B travel industry.</p>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <a href="https://www.instagram.com/agentbazarblogs/" target="_blank" rel="noreferrer" style={{ color: '#6b7a8d', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#F47920'} onMouseLeave={(e) => e.currentTarget.style.color = '#6b7a8d'}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    <a href="https://www.facebook.com/people/Agentbazarblogs/" target="_blank" rel="noreferrer" style={{ color: '#6b7a8d', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#F47920'} onMouseLeave={(e) => e.currentTarget.style.color = '#6b7a8d'}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </a>
                    <a href="https://x.com/AgentBazar" target="_blank" rel="noreferrer" style={{ color: '#6b7a8d', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#F47920'} onMouseLeave={(e) => e.currentTarget.style.color = '#6b7a8d'}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
                    </a>
                  </div>
                </div>

                <div style={{ flex: '0 0 auto', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.4)', textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.05)' }}>
                  <h5 style={{ fontSize: '13px', fontWeight: 700, color: '#1A4FA0', marginBottom: '12px', maxWidth: '140px', lineHeight: '1.4' }}>Get daily travel & flights updates</h5>
                  <button onClick={() => setShowPopup(true)} style={{ background: 'linear-gradient(135deg, #F47920 0%, #ff9547 100%)', color: 'white', border: 'none', borderRadius: '100px', padding: '10px 20px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(244,121,32,0.3)' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-col">
            <h4>Categories</h4>
            {CATEGORIES.filter(c => c !== 'All').slice(0, 6).map(cat => (
              <Link key={cat} href={`/?category=${encodeURIComponent(cat)}`}>{cat}</Link>
            ))}
          </div>
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

      {showPopup && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 25, 35, 0.6)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            padding: '40px',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '420px',
            boxShadow: '0 32px 64px rgba(0,0,0,0.3)',
            position: 'relative',
            border: '1px solid rgba(255,255,255,0.4)',
            transform: 'translateY(0)',
            animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <button onClick={() => setShowPopup(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.05)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#1a2332', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}>
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#0f1923', marginBottom: '12px', textAlign: 'center', fontFamily: 'sans-serif' }}>Stay Updated</h3>
            <p style={{ color: '#6b7a8d', textAlign: 'center', marginBottom: '32px', fontSize: '15.5px', lineHeight: '1.5' }}>Get daily travel, flight updates, and expert insights right to your inbox.</p>
            
            <form onSubmit={(e) => { e.preventDefault(); setShowPopup(false); alert('Subscribed successfully!'); }}>
              <input type="text" placeholder="Full Name" required style={{ width: '100%', padding: '14px 18px', borderRadius: '14px', border: '1.5px solid rgba(26,79,160,0.1)', background: 'rgba(255,255,255,0.9)', marginBottom: '16px', outline: 'none', fontSize: '15.5px', color: '#1a2332', transition: 'border-color 0.2s' }} onFocus={(e) => e.currentTarget.style.borderColor = '#F47920'} onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(26,79,160,0.1)'} />
              <input type="email" placeholder="Email Address" required style={{ width: '100%', padding: '14px 18px', borderRadius: '14px', border: '1.5px solid rgba(26,79,160,0.1)', background: 'rgba(255,255,255,0.9)', marginBottom: '32px', outline: 'none', fontSize: '15.5px', color: '#1a2332', transition: 'border-color 0.2s' }} onFocus={(e) => e.currentTarget.style.borderColor = '#F47920'} onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(26,79,160,0.1)'} />
              <button type="submit" style={{ width: '100%', padding: '16px', borderRadius: '14px', background: 'linear-gradient(135deg, #F47920 0%, #ff9547 100%)', color: 'white', border: 'none', fontWeight: 700, fontSize: '16px', cursor: 'pointer', transition: 'transform 0.2s, boxShadow 0.2s', boxShadow: '0 8px 24px rgba(244,121,32,0.3)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(244,121,32,0.4)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(244,121,32,0.3)'; }}>
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      )}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </>
  )
}

