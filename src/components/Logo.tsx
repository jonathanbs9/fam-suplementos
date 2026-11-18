export function Logo({ className = '' }: { className?: string }) {
  return (
    <a href="#inicio" className={`flex items-center gap-2.5 ${className}`} aria-label="FAM Suplementos — inicio">
      <span className="relative grid size-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-800 shadow-float">
        <svg viewBox="0 0 24 24" className="size-5 text-white" fill="none" aria-hidden>
          <path d="M6 20V5h11v3.4H9.8v2.6h6.4v3.3H9.8V20H6Z" fill="currentColor" />
          <path d="M15.5 13.5c2.6-.2 4.3-2 4.5-4.8-2.7.1-4.4 1.8-4.5 4.8Z" fill="var(--color-lime)" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block text-[19px] font-extrabold tracking-tight">FAM</span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">Suplementos</span>
      </span>
    </a>
  )
}
