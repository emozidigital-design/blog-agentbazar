import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AgentBazar Blog – Travel Industry News & Insights',
  description: 'Visa updates, aviation trends, and expert insights for B2B travel professionals.',
  metadataBase: new URL('https://blog.agentbazar.in'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
