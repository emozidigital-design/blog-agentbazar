import type { Metadata } from 'next'
import './globals.css'
import GoogleTagManager from '@/components/GoogleTagManager'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export const metadata: Metadata = {
  title: 'AgentBazar Blog – Travel Industry News & Insights',
  description: 'Visa updates, aviation trends, and expert insights for B2B travel professionals.',
  metadataBase: new URL('https://blog.agentbazar.in'),
  openGraph: {
    siteName: 'AgentBazar Blog',
    type: 'website',
    images: [{ url: '/new-logo.jpg', width: 1200, height: 630, alt: 'AgentBazar Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
        {children}
      </body>
    </html>
  )
}
