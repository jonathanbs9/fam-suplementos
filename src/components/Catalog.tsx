import { useDeferredValue, useMemo, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { ChevronDown, LayoutGrid, Search, SearchX, Wheat, X } from 'lucide-react'
import { BRANDS, GROUPS, PRODUCTS, type GroupId } from '../data/catalog'
import { normalize } from '../lib/format'
import { useFilters, type SortKey } from '../store/filters'
import { ProductCard } from './ProductCard'
import { SectionHeading } from './SectionHeading'

const PAGE = 24
const index = PRODUCTS.map((p) => ({ p, hay: normalize(`${p.brand} ${p.name} ${p.category}`) }))

const SORTS: { id: SortKey; label: string }[] = [
  { id: 'relevance', label: 'Destacados' },
  { id: 'price-asc', label: 'Menor precio' },
  { id: 'price-desc', label: 'Mayor precio' },
  { id: 'name', label: 'Nombre A–Z' },
]

export function Catalog() {
  const f = useFilters()
  const query = useDeferredValue(f.query)

  // Aplica todo menos el grupo → permite mostrar conteos por categoría en el sidebar
  const base = useMemo(() => {
    const terms = normalize(query).split(/\s+/).filter(Boolean)
    return index
      .filter(({ p, hay }) =>
        (f.brand === 'all' || p.brand === f.brand) &&
        (!f.glutenFree || p.glutenFree) &&
        terms.every((t) => hay.includes(t)))
      .map(({ p }) => p)
  }, [query, f.brand, f.glutenFree])

  const counts = useMemo(() => {
    const c: Partial<Record<GroupId, number>> = {}
    for (const p of base) c[p.group] = (c[p.group] ?? 0) + 1
    return c
  }, [base])

  const results = useMemo(() => {
    const list = f.group === 'all' ? [...base] : base.filter((p) => p.group === f.group)
    if (f.sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (f.sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (f.sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name, 'es'))
    return list
  }, [base, f.group, f.sort])

  // La paginación se reinicia cuando cambian los filtros (estado derivado, sin efectos)
  const signature = [query, f.group, f.brand, f.glutenFree, f.sort].join('|')
  const [page, setPage] = useState({ signature, limit: PAGE })
  const limit = page.signature === signature ? page.limit : PAGE

  const active = f.query || f.group !== 'all' || f.brand !== 'all' || f.glutenFree
  const shown = results.slice(0, limit)

  return (
    <section id="catalogo" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHeading eyebrow="Catálogo" title="Todos los productos">
        Precios en pesos argentinos según lista vigente. Sumá productos a tu pedido y envialo por WhatsApp.
      </SectionHeading>

      <div className="mt-10 grid gap-6 lg:grid-cols-[250px_1fr]">
        {/* Sidebar — al estilo del menú lateral de la referencia */}
        <aside className="hidden lg:block">
          <div className="card sticky top-24 p-3">
            <p className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Categorías</p>
            <SideItem active={f.group === 'all'} onClick={() => f.set({ group: 'all' })} icon={LayoutGrid}
              label="Todo" count={base.length} />
            {GROUPS.map((g) => (
              <SideItem key={g.id} active={f.group === g.id} onClick={() => f.set({ group: g.id })}
                icon={g.icon} label={g.label} count={counts[g.id] ?? 0} />
            ))}
            <p className="px-3 pb-2 pt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Filtros</p>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-surface">
              <Wheat className="size-[18px] text-muted" />
              Solo Sin TACC
              <Toggle checked={f.glutenFree} onChange={(v) => f.set({ glutenFree: v })} />
            </label>
          </div>
        </aside>

        <div className="min-w-0">
          {/* Barra de herramientas */}
          <div className="card sticky top-[4.5rem] z-20 flex flex-wrap items-center gap-2 p-2 sm:gap-3 lg:static">
            <label className="relative flex basis-full items-center sm:min-w-[200px] sm:flex-1 sm:basis-auto">
              <Search className="pointer-events-none absolute left-3 size-4 text-muted" />
              <input id="catalog-search" type="search" value={f.query} onChange={(e) => f.set({ query: e.target.value })}
                placeholder="Buscar por producto, marca o sabor…"
                className="h-11 w-full rounded-xl border border-line bg-surface pl-9 pr-3 text-sm outline-none transition placeholder:text-muted focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100" />
            </label>
            <Select value={f.brand} onChange={(v) => f.set({ brand: v })} label="Marca"
              options={[{ value: 'all', label: 'Todas las marcas' }, ...BRANDS.map((b) => ({ value: b, label: b }))]} />
            <Select value={f.sort} onChange={(v) => f.set({ sort: v as SortKey })} label="Ordenar"
              options={SORTS.map((s) => ({ value: s.id, label: s.label }))} />
          </div>

          {/* Chips mobile */}
          <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 lg:hidden">
            <Chip active={f.group === 'all'} onClick={() => f.set({ group: 'all' })}>Todo</Chip>
            {GROUPS.map((g) => (
              <Chip key={g.id} active={f.group === g.id} onClick={() => f.set({ group: g.id })}>
                {g.label} <span className="opacity-60">{counts[g.id] ?? 0}</span>
              </Chip>
            ))}
            <Chip active={f.glutenFree} onClick={() => f.set({ glutenFree: !f.glutenFree })}>Sin TACC</Chip>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
            <p><b className="text-ink">{results.length}</b> {results.length === 1 ? 'producto' : 'productos'}</p>
            {active && (
              <button onClick={f.reset} className="inline-flex items-center gap-1 rounded-lg px-2 py-1 font-medium text-brand-700 hover:bg-brand-50">
                <X className="size-3.5" /> Limpiar filtros
              </button>
            )}
          </div>

          {results.length === 0 ? (
            <div className="card mt-4 grid place-items-center px-6 py-20 text-center">
              <SearchX className="size-10 text-muted" />
              <p className="mt-4 font-semibold">No encontramos productos con esos filtros</p>
              <p className="mt-1 text-sm text-muted">Probá con otra búsqueda o consultanos por WhatsApp.</p>
              <button onClick={f.reset} className="mt-5 rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-white">Ver todo</button>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="popLayout" initial={false}>
                {shown.map((p) => <ProductCard key={p.id} product={p} />)}
              </AnimatePresence>
            </div>
          )}

          {limit < results.length && (
            <div className="mt-8 flex flex-col items-center gap-3">
              <div className="h-1 w-48 overflow-hidden rounded-full bg-line">
                <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${(limit / results.length) * 100}%` }} />
              </div>
              <p className="text-xs text-muted">Mostrando {limit} de {results.length}</p>
              <button onClick={() => setPage({ signature, limit: limit + PAGE })}
                className="rounded-xl border border-line bg-white px-5 py-2.5 text-sm font-semibold shadow-card transition hover:border-brand-200 hover:text-brand-700">
                Cargar más productos
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function SideItem({ active, onClick, icon: Icon, label, count }: {
  active: boolean; onClick: () => void; icon: React.ComponentType<{ className?: string }>; label: string; count: number
}) {
  return (
    <button onClick={onClick} disabled={!active && count === 0}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition disabled:opacity-40 ${active
        ? 'bg-gradient-to-b from-[#2a302d] to-ink text-white shadow-md'
        : 'text-ink/80 hover:bg-surface'}`}>
      <Icon className={`size-[18px] ${active ? 'text-lime' : 'text-muted'}`} />
      <span className="flex-1 truncate">{label}</span>
      <span className={`rounded-md px-1.5 text-[11px] font-semibold tabular-nums ${active ? 'bg-white/15' : 'bg-surface text-muted'}`}>{count}</span>
    </button>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
      className={`shrink-0 rounded-full border px-3.5 py-2 text-sm font-medium transition ${active
        ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink/80'}`}>
      {children}
    </button>
  )
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <span className="relative ml-auto inline-flex">
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="h-5 w-9 rounded-full bg-line transition peer-checked:bg-brand-600 peer-focus-visible:ring-4 peer-focus-visible:ring-brand-100" />
      <span className="absolute left-0.5 top-0.5 size-4 rounded-full bg-white shadow transition peer-checked:translate-x-4" />
    </span>
  )
}

function Select({ value, onChange, options, label }: {
  value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; label: string
}) {
  return (
    <label className="relative flex-1 sm:flex-none">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-line bg-white pl-3.5 pr-9 text-sm font-medium outline-none transition hover:border-brand-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-100 sm:w-auto">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
    </label>
  )
}
