import { BRANDS, PRODUCTS } from '../data/catalog'
import { goToCatalog, useFilters } from '../store/filters'

const counts = PRODUCTS.reduce<Record<string, number>>((a, p) => ((a[p.brand] = (a[p.brand] ?? 0) + 1), a), {})

export function Brands() {
  const set = useFilters((s) => s.set)
  const row = [...BRANDS].sort((a, b) => counts[b] - counts[a])
  const pick = (brand: string) => { set({ brand, group: 'all', query: '' }); goToCatalog() }

  return (
    <section id="marcas" className="border-y border-line bg-white py-10">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        Trabajamos con {BRANDS.length} marcas
      </p>
      <div className="group relative mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused]">
          {[...row, ...row].map((b, i) => (
            <button key={i} onClick={() => pick(b)} aria-hidden={i >= row.length} tabIndex={i >= row.length ? -1 : 0}
              className="flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-[15px] font-semibold tracking-tight text-ink/80 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700">
              {b}
              <span className="text-xs font-medium text-muted">{counts[b]}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
