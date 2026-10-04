import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'
import { brand } from '@/config/brand'
import { CartProvider } from '@/lib/cart'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const viewport: Viewport = { themeColor: '#2f4a3a', width: 'device-width', initialScale: 1 }

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: { default: `${brand.name} | Honest skincare for Indian weather`, template: `%s | ${brand.name}` },
  description: brand.description,
  alternates: { canonical: '/' },
  openGraph: { siteName: brand.name, type: 'website', locale: 'en_IN', title: `${brand.name} | ${brand.tagline}`, description: brand.description },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <JsonLd
          data={[
            { '@context': 'https://schema.org', '@type': 'Organization', name: brand.name, url: brand.siteUrl, email: brand.email },
            { '@context': 'https://schema.org', '@type': 'WebSite', name: brand.name, url: brand.siteUrl },
          ]}
        />
        <CartProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
