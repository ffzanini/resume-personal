import type { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

import { AppProvider } from '@/providers'
import { fontMavenPro } from './fonts'

import './globals.css'

const description = `software engineer, artist, musician, writer and a indie developer enthusiast`

export const metadata: Metadata = {
  title: 'Felipe Frant Zanini | Software Engineer',
  icons: '/favicon.ico',
  openGraph: {
    type: 'website',
    url: 'https://ffzanini.dev',
    title: 'Felipe Frant Zanini | Software Engineer',
    description,
    images: [
      {
        url: '/images/visit-card.png',
        width: 1200,
        height: 630,
        alt: 'Felipe Frant Zanini | Software Engineer',
      },
    ],
  },
  description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" className="dark" translate="no">
      <meta name="google" content="notranslate" />
      <body className={`${fontMavenPro.className} antialiased`}>
        <AppProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </AppProvider>
      </body>
    </html>
  )
}
