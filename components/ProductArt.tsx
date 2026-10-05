import { useId } from 'react'
import type { Product } from '@/data/products'

const serif = { fontFamily: 'var(--font-fraunces), Georgia, serif' } as const
const sans = { fontFamily: 'var(--font-inter), system-ui, sans-serif' } as const

/**
 * Original studio-style packshot, drawn in SVG so every product has a consistent 4:5 image with a real label.
 * Swap for photography later by rendering <Image> in the same 4:5 frame.
 */
export function ProductArt({ product: p, className = '', bare = false }: { product: Product; className?: string; bare?: boolean }) {
  const id = useId().replace(/:/g, '')
  const { theme: t, shape, label } = p
  const [l1, l2] = label.title
  const bigSize = label.big.length > 3 ? 24 : 34

  const Label = ({ x, y, w, h }: { x: number; y: number; w: number; h: number }) => {
    const cx = x + w / 2
    return (
      <g>
        <rect x={x} y={y} width={w} height={h} rx="7" fill="#fffaf1" />
        <text x={cx} y={y + 20} textAnchor="middle" fontSize="10" letterSpacing="4" fontWeight="700" fill={t.accent} style={serif}>NOOR</text>
        <line x1={cx - 12} x2={cx + 12} y1={y + 28} y2={y + 28} stroke={t.accent} strokeOpacity=".4" />
        <text x={cx} y={y + 46} textAnchor="middle" fontSize="8.5" letterSpacing="1.2" fontWeight="600" fill="#1f2a24" style={sans}>{l1}</text>
        {l2 && <text x={cx} y={y + 58} textAnchor="middle" fontSize="8.5" letterSpacing="1.2" fontWeight="600" fill="#1f2a24" style={sans}>{l2}</text>}
        <text x={cx} y={y + h - 26} textAnchor="middle" fontSize={bigSize} fontWeight="600" fill={t.accent} style={serif}>{label.big}</text>
        <text x={cx} y={y + h - 11} textAnchor="middle" fontSize="8" letterSpacing="1.5" fill="#55615a" style={sans}>{p.size.toUpperCase()}</text>
      </g>
    )
  }

  const glass = `url(#${id}g)`

  return (
    <svg viewBox="0 0 400 500" role="img" aria-label={`${p.name}, ${p.size}`} className={className}>
      <defs>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={t.bg[0]} /><stop offset="1" stopColor={t.bg[1]} /></linearGradient>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity=".55" />
          <stop offset=".18" stopColor={t.glass} />
          <stop offset=".8" stopColor={t.glass} />
          <stop offset="1" stopColor={t.cap} stopOpacity=".25" />
        </linearGradient>
        <linearGradient id={`${id}c`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={t.cap} /><stop offset=".35" stopColor="#fff" stopOpacity=".35" /><stop offset=".5" stopColor={t.cap} /><stop offset="1" stopColor="#000" stopOpacity=".25" />
        </linearGradient>
        <filter id={`${id}s`} x="-30%" y="-10%" width="160%" height="140%"><feGaussianBlur stdDeviation="10" /></filter>
      </defs>
      {!bare && <rect width="400" height="500" fill={`url(#${id}b)`} />}
      {!bare && <circle cx="200" cy="270" r="150" fill="#fff" opacity=".28" />}
      <ellipse cx="200" cy="452" rx="92" ry="12" fill="#1f2a24" opacity=".28" filter={`url(#${id}s)`} />

      {shape === 'dropper' && (
        <g>
          <path d="M178 96 q22-34 44 0 v62 h-44z" fill="#1f2a24" opacity=".92" />
          <rect x="166" y="150" width="68" height="34" rx="6" fill={`url(#${id}c)`} />
          <rect x="176" y="184" width="48" height="22" fill={glass} stroke={t.cap} strokeOpacity=".25" />
          <path d="M132 232 q0-26 44-26 h48 q44 0 44 26 v186 q0 34-34 34 h-68 q-34 0-34-34z" fill={glass} stroke={t.cap} strokeOpacity=".3" />
          <rect x="144" y="236" width="7" height="196" rx="3.5" fill="#fff" opacity=".45" />
          <Label x={148} y={262} w={104} h={150} />
        </g>
      )}
      {shape === 'pump' && (
        <g>
          <rect x="228" y="100" width="58" height="13" rx="6" fill={`url(#${id}c)`} />
          <rect x="176" y="96" width="62" height="24" rx="8" fill={`url(#${id}c)`} />
          <rect x="192" y="118" width="30" height="52" fill={t.cap} opacity=".9" />
          <rect x="172" y="168" width="70" height="26" rx="5" fill={`url(#${id}c)`} />
          <rect x="126" y="192" width="148" height="260" rx="30" fill={glass} stroke={t.cap} strokeOpacity=".3" />
          <rect x="140" y="204" width="8" height="236" rx="4" fill="#fff" opacity=".5" />
          <Label x={146} y={250} w={108} h={150} />
        </g>
      )}
      {shape === 'tube' && (
        <g>
          <rect x="136" y="92" width="128" height="20" rx="3" fill={t.cap} />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <line key={i} x1={144 + i * 16} x2={144 + i * 16} y1="96" y2="108" stroke="#000" strokeOpacity=".18" />)}
          <path d="M136 112 h128 l16 292 h-160z" fill={glass} stroke={t.cap} strokeOpacity=".35" />
          <path d="M152 126 l9 270" stroke="#fff" strokeWidth="7" opacity=".45" strokeLinecap="round" />
          <rect x="120" y="402" width="160" height="42" rx="12" fill={`url(#${id}c)`} />
          <Label x={150} y={176} w={100} h={170} />
        </g>
      )}
      {shape === 'jar' && (
        <g>
          <rect x="84" y="244" width="232" height="66" rx="18" fill={`url(#${id}c)`} />
          <rect x="94" y="252" width="212" height="6" rx="3" fill="#fff" opacity=".3" />
          <rect x="92" y="306" width="216" height="140" rx="30" fill={glass} stroke={t.cap} strokeOpacity=".3" />
          <rect x="106" y="318" width="8" height="116" rx="4" fill="#fff" opacity=".5" />
          <Label x={128} y={326} w={144} h={108} />
        </g>
      )}
      {shape === 'stick' && (
        <g>
          <rect x="154" y="128" width="92" height="124" rx="14" fill={`url(#${id}c)`} />
          <rect x="160" y="248" width="80" height="196" rx="12" fill={glass} stroke={t.cap} strokeOpacity=".3" />
          <rect x="167" y="258" width="6" height="176" rx="3" fill="#fff" opacity=".5" />
          <Label x={172} y={292} w={56} h={124} />
        </g>
      )}
      {shape === 'kit' && (
        <g>
          {[[118, 108, 38, 96], [170, 84, 40, 120], [224, 100, 38, 104], [270, 116, 24, 88]].map(([x, y, w, h], i) => (
            <rect key={i} x={x} y={y} width={w} height={h} rx="10" fill={glass} stroke={t.cap} strokeOpacity=".35" />
          ))}
          <rect x="82" y="196" width="236" height="248" rx="14" fill={t.glass} stroke={t.cap} strokeOpacity=".3" />
          <rect x="74" y="180" width="252" height="48" rx="12" fill={t.cap} />
          <text x="200" y="212" textAnchor="middle" fontSize="15" letterSpacing="8" fontWeight="700" fill="#fffaf1" style={serif}>NOOR</text>
          <text x="200" y="300" textAnchor="middle" fontSize="11" letterSpacing="3" fontWeight="600" fill={t.accent} style={sans}>{l1}</text>
          {l2 && <text x="200" y="316" textAnchor="middle" fontSize="11" letterSpacing="3" fontWeight="600" fill={t.accent} style={sans}>{l2}</text>}
          <text x="200" y="392" textAnchor="middle" fontSize="64" fontWeight="600" fill={t.accent} style={serif}>{label.big}</text>
          <text x="200" y="418" textAnchor="middle" fontSize="10" letterSpacing="3" fill="#55615a" style={sans}>STEP ROUTINE</text>
        </g>
      )}
    </svg>
  )
}
