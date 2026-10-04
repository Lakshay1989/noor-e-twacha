import type { Product } from '@/data/products'

// Drawn packaging, so the store looks finished before real photography exists.
// Replace with <Image> once you have product shots.
export function ProductArt({ product, className = '' }: { product: Product; className?: string }) {
  const { shape, color, accent, name } = product
  const label = (x: number, y: number, w: number, h: number) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="4" fill="#fffaf2" opacity=".92" />
      <text x={x + w / 2} y={y + h / 2 - 2} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent} fontFamily="Georgia,serif" letterSpacing="2">
        OJAS
      </text>
      <rect x={x + w / 2 - 14} y={y + h / 2 + 5} width="28" height="2" rx="1" fill={accent} opacity=".5" />
    </g>
  )
  return (
    <svg viewBox="0 0 200 240" role="img" aria-label={name} className={className}>
      <ellipse cx="100" cy="222" rx="52" ry="7" fill="#1f2a24" opacity=".08" />
      {shape === 'pump' && (
        <>
          <rect x="82" y="34" width="36" height="9" rx="3" fill={accent} />
          <rect x="96" y="43" width="8" height="18" fill={accent} />
          <rect x="62" y="60" width="76" height="152" rx="16" fill={color} stroke={accent} strokeOpacity=".25" />
          {label(72, 112, 56, 52)}
        </>
      )}
      {shape === 'dropper' && (
        <>
          <path d="M88 22 q12-14 24 0 v34 h-24z" fill={accent} />
          <rect x="82" y="54" width="36" height="12" rx="3" fill={accent} opacity=".85" />
          <rect x="66" y="66" width="68" height="146" rx="14" fill={color} stroke={accent} strokeOpacity=".3" />
          {label(74, 116, 52, 54)}
        </>
      )}
      {shape === 'tube' && (
        <>
          <path d="M70 40 h60 l-6 160 h-48z" fill={color} stroke={accent} strokeOpacity=".3" />
          <rect x="82" y="22" width="36" height="20" rx="4" fill={accent} />
          <rect x="68" y="196" width="64" height="12" rx="3" fill={accent} opacity=".85" />
          {label(76, 96, 48, 54)}
        </>
      )}
      {shape === 'jar' && (
        <>
          <rect x="52" y="108" width="96" height="104" rx="18" fill={color} stroke={accent} strokeOpacity=".3" />
          <rect x="48" y="80" width="104" height="32" rx="10" fill={accent} />
          {label(66, 134, 68, 48)}
        </>
      )}
      {shape === 'stick' && (
        <>
          <rect x="78" y="48" width="44" height="48" rx="10" fill={accent} opacity=".7" />
          <rect x="74" y="92" width="52" height="120" rx="8" fill={color} stroke={accent} strokeOpacity=".3" />
          {label(80, 130, 40, 44)}
        </>
      )}
      {shape === 'kit' && (
        <>
          <rect x="36" y="64" width="128" height="148" rx="10" fill={color} stroke={accent} strokeOpacity=".3" />
          <rect x="36" y="64" width="128" height="26" rx="10" fill={accent} />
          <rect x="52" y="104" width="20" height="62" rx="5" fill="#fff" opacity=".7" />
          <rect x="80" y="96" width="20" height="70" rx="5" fill="#fff" opacity=".85" />
          <rect x="108" y="108" width="20" height="58" rx="5" fill="#fff" opacity=".7" />
          <rect x="132" y="116" width="16" height="50" rx="5" fill="#fff" opacity=".85" />
          <text x="100" y="196" textAnchor="middle" fontSize="12" fontWeight="700" fill={accent} fontFamily="Georgia,serif" letterSpacing="3">
            OJAS
          </text>
        </>
      )}
    </svg>
  )
}
