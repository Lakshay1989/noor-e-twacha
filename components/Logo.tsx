import { brand } from '@/config/brand'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
        <circle cx="16" cy="16" r="15" fill="#2f4a3a" />
        <circle cx="16" cy="16" r="5.2" fill="#f1c27d" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line key={a} x1="16" y1="6.2" x2="16" y2="8.6" stroke="#f1c27d" strokeWidth="1.6" strokeLinecap="round" transform={`rotate(${a} 16 16)`} />
        ))}
      </svg>
      <span className="font-serif text-[1.05rem] font-semibold tracking-[0.12em] sm:text-2xl sm:tracking-[0.18em]">{brand.name.toUpperCase()}</span>
    </span>
  )
}
