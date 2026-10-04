import { ImageResponse } from 'next/og'
import { brand } from '@/config/brand'

export const alt = `${brand.name}: ${brand.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 90, background: 'linear-gradient(135deg,#f6e7d3,#ecd2b2)', color: '#2f4a3a' }}>
        <div style={{ fontSize: 40, letterSpacing: 14, fontWeight: 700 }}>{brand.name.toUpperCase()}</div>
        <div style={{ fontSize: 76, lineHeight: 1.08, marginTop: 28, maxWidth: 900 }}>{brand.tagline}</div>
        <div style={{ fontSize: 30, marginTop: 30, color: '#55615a' }}>Every active and its percentage on the pack.</div>
      </div>
    ),
    size,
  )
}
