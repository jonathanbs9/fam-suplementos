import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, ArrowUpRight, BadgeCheck, MessageCircle, Plus, Wheat } from 'lucide-react'
import {
  BRANDS, FEATURED_IDS, GROUPS, PRODUCTS, STATS, groupStats, imageFor, type GroupId,
} from '../data/catalog'
import { formatPrice } from '../lib/format'
import { useCart, whatsappUrl } from '../store/cart'
import { goToCatalog, useFilters } from '../store/filters'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: 0.08 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } }),
}

export function Hero() {
  const featured = useMemo(() => FEATURED_IDS.map((id) => PRODUCTS.find((p) => p.id === id)!).filter(Boolean), [])
  const hero = featured[0]
  const add = useCart((s) => s.add)
  const setOpen = useCart((s) => s.setOpen)
  const setFilters = useFilters((s) => s.set)

  const browse = (group: GroupId | 'all', extra: Partial<Parameters<typeof setFilters>[0]> = {}) => {
    setFilters({ group, brand: 'all', query: '', glutenFree: false, ...extra })
    goToCatalog()
  }

  return (
    <section id="inicio" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-10">
      <div className="card relative overflow-hidden p-5 sm:p-8 lg:p-10">
        {/* textura sutil */}
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[520px] rounded-full bg-brand-100/60 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.02fr_1fr] lg:gap-12">
          {/* Columna izquierda */}
          <div className="flex flex-col justify-center">
            <motion.span variants={fadeUp} initial="hidden" animate="show"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
              <span className="size-1.5 rounded-full bg-brand-500" />
              Nutrición · Salud · Rendimiento
            </motion.span>

            <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="show"
              className="mt-5 text-[2.6rem] font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[3.7rem]">
              Suplementos para
              <br />
              <span className="relative inline-block text-brand-700">
                rendir más
                <svg viewBox="0 0 300 14" className="absolute -bottom-2 left-0 h-3 w-full text-lime" preserveAspectRatio="none" aria-hidden>
                  <path d="M2 10C70 3 170 2 298 7" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
                </svg>
              </span>
              <br />
              cada día.
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} initial="hidden" animate="show"
              className="mt-6 max-w-lg text-[17px] leading-relaxed text-muted">
              Más de {Math.floor(STATS.products / 50) * 50} productos de Star Nutrition, Ena, Gentech, Pulver y las
              marcas que ya conocés. Armá tu pedido acá y lo confirmamos por WhatsApp.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} initial="hidden" animate="show" className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => browse('all')}
                className="group inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-b from-[#2a302d] to-ink px-5 text-[15px] font-semibold text-white shadow-lg transition active:scale-[.98]">
                Ver catálogo
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </button>
              <a href={whatsappUrl()} target="_blank" rel="noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-line bg-white px-5 text-[15px] font-semibold transition hover:border-brand-200 hover:text-brand-700">
                <MessageCircle className="size-4" />
                Consultar por WhatsApp
              </a>
            </motion.div>

            <motion.dl variants={fadeUp} custom={4} initial="hidden" animate="show"
              className="mt-10 grid max-w-md grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-surface">
              {[
                [STATS.products, 'productos'],
                [STATS.brands, 'marcas'],
                [GROUPS.length, 'categorías'],
              ].map(([n, l]) => (
                <div key={l} className="px-4 py-3">
                  <dt className="text-2xl font-bold tracking-tight">{n}</dt>
                  <dd className="text-xs text-muted">{l}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Columna derecha — bento inspirado en el dashboard de referencia */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {hero && (
              <motion.article variants={fadeUp} custom={1} initial="hidden" animate="show"
                className="col-span-2 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
                <div className="relative flex gap-4 overflow-hidden bg-gradient-to-br from-brand-500 via-brand-700 to-brand-900 p-5 text-white sm:p-6">
                  <div aria-hidden className="absolute -left-10 -top-16 size-56 rounded-full bg-white/10 blur-2xl" />
                  <div className="relative flex-1">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-xl bg-white text-brand-700"><BadgeCheck className="size-5" /></span>
                      <div>
                        <p className="font-semibold">Destacado</p>
                        <p className="text-xs text-white/70">{hero.brand}</p>
                      </div>
                    </div>
                    <h3 className="mt-5 max-w-[16rem] text-lg font-semibold leading-snug">{hero.name}</h3>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-3xl font-bold tracking-tight">{formatPrice(hero.price)}</span>
                      {hero.glutenFree && <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-brand-700">Sin TACC</span>}
                    </div>
                  </div>
                  <motion.img src={imageFor(hero)} alt={hero.name}
                    initial={{ rotate: -4, y: 10 }} animate={{ rotate: 2, y: 0 }}
                    transition={{ duration: 2.4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
                    className="relative h-36 w-auto self-center rounded-2xl bg-white p-2 shadow-2xl ring-4 ring-white/15 sm:h-44" />
                </div>
                <button onClick={() => { add(hero.id); setOpen(true) }}
                  className="flex w-full items-center justify-between px-5 py-3.5 text-sm font-medium text-ink/80 transition hover:bg-surface sm:px-6">
                  Agregar al pedido
                  <Plus className="size-4" />
                </button>
              </motion.article>
            )}

            <MiniCard i={2} title="Sin TACC" subtitle="Aptos celíacos"
              icon={<Wheat className="size-5" />} value={`${STATS.glutenFree}`} unit="productos"
              cta="Ver aptos" onClick={() => browse('all', { glutenFree: true })} />
            <MiniCard i={3} title="Marcas" subtitle="Líderes del mercado"
              icon={<BadgeCheck className="size-5" />} value={`${BRANDS.length}`} unit="marcas"
              cta="Explorar" onClick={() => document.getElementById('marcas')?.scrollIntoView({ behavior: 'smooth' })} />

            <motion.div variants={fadeUp} custom={4} initial="hidden" animate="show" className="col-span-2">
              <CategoryChart onPick={(g) => browse(g)} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MiniCard(props: {
  i: number; title: string; subtitle: string; icon: React.ReactNode; value: string; unit: string; cta: string; onClick: () => void
}) {
  return (
    <motion.article variants={fadeUp} custom={props.i} initial="hidden" animate="show"
      className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card">
      <div className="flex-1 p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl border border-line bg-surface text-brand-700">{props.icon}</span>
          <div className="min-w-0">
            <p className="truncate font-semibold">{props.title}</p>
            <p className="truncate text-xs text-muted">{props.subtitle}</p>
          </div>
        </div>
        <p className="mt-4 flex items-baseline gap-1.5">
          <span className="text-3xl font-bold tracking-tight">{props.value}</span>
          <span className="text-xs text-muted">{props.unit}</span>
        </p>
      </div>
      <button onClick={props.onClick}
        className="flex items-center justify-between border-t border-line px-4 py-3 text-sm text-ink/80 transition hover:bg-surface sm:px-5">
        {props.cta}
        <ArrowRight className="size-4" />
      </button>
    </motion.article>
  )
}

/** Gráfico de barras con datos reales del catálogo: cantidad de productos por categoría. */
function CategoryChart({ onPick }: { onPick: (g: GroupId) => void }) {
  const data = useMemo(() => GROUPS.slice(0, 8).map((g) => ({ ...g, ...groupStats(g.id) })), [])
  const max = Math.max(...data.map((d) => d.count))
  const [active, setActive] = useState(0)
  const cur = data[active]

  return (
    <div className="rounded-2xl border border-line bg-white p-4 shadow-card sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted">Catálogo por categoría</p>
          <p className="mt-1 text-2xl font-bold tracking-tight">{cur.label}</p>
        </div>
        <button onClick={() => onPick(cur.id)}
          className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-800">
          <span className="size-1.5 rounded-full bg-lime" /> Ver {cur.count}
          <ArrowUpRight className="size-3.5" />
        </button>
      </div>

      <div className="relative mt-2 flex h-48 items-end pt-12 gap-2 sm:gap-3" role="list">
        {data.map((d, i) => {
          const on = i === active
          return (
            <button key={d.id} role="listitem" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => onPick(d.id)}
              className="group relative flex h-full flex-1 flex-col justify-end" aria-label={`${d.label}: ${d.count} productos`}>
              <motion.div
                initial={{ height: 0 }} animate={{ height: `${Math.max(14, (d.count / max) * 100)}%` }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`relative w-full rounded-lg transition-colors ${on
                  ? 'bg-gradient-to-b from-brand-700 to-brand-400/40'
                  : 'bg-gradient-to-b from-brand-100 to-brand-50/30 group-hover:from-brand-200'}`}>
                {on && (
                  <motion.div layoutId="tip"
                    className={`pointer-events-none absolute bottom-full z-10 mb-2 w-max rounded-lg ${i === 0 ? 'left-0' : i === data.length - 1 ? 'right-0' : 'left-1/2 -translate-x-1/2'} bg-ink px-2.5 py-1.5 text-left text-[11px] leading-tight text-white shadow-xl`}>
                    <span className="text-white/60">{d.count} productos</span>
                    <br />desde <b>{formatPrice(d.from)}</b>
                  </motion.div>
                )}
                {on && <span className="absolute left-1/2 top-1.5 size-3 -translate-x-1/2 rounded-full border-2 border-white bg-brand-500" />}
              </motion.div>
            </button>
          )
        })}
      </div>
      <div className="mt-2 flex gap-2 text-center text-[10px] text-muted sm:gap-3 sm:text-[11px]">
        {data.map((d) => <span key={d.id} className="flex-1 truncate">{d.label.split(' ')[0]}</span>)}
      </div>
    </div>
  )
}
