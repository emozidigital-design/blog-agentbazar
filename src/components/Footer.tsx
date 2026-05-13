import Link from 'next/link'
import { CATEGORIES } from '@/lib/supabase'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="/ab-logo.png" alt="AgentBazar" style={{ height: 36, width: 'auto', objectFit: 'contain' }} />
          <p>India's leading B2B travel platform. Stay updated with aviation news, visa updates, and expert insights.</p>
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
        <span>Editorial Team</span>
      </div>
    </footer>
  )
}
