import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { GROUPS, groupStats } from '../data/catalog'
import { formatPrice } from '../lib/format'
import { goToCatalog, useFilters } from '../store/filters'
import { SectionHeading } from './SectionHeading'

export function Categories() {
  const set = useFilters((s) => s.set)
  return (
    <section id="categorias" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHeading eyebrow="Categorías" title="Encontrá lo que tu entrenamiento necesita">
        Desde proteínas y creatinas hasta hidratación y snacks.
      </SectionHeading>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {GROUPS.map((g, i) => {
          const { count, from } = groupStats(g.id)
          const Icon = g.icon
          const big = i === 0
          return (
            <motion.button key={g.id}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: (i % 4) * 0.05, duration: 0.5 }}
              onClick={() => { set({ group: g.id, brand: 'all', query: '' }); goToCatalog() }}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 sm:p-5 ${big
                ? 'border-brand-700 bg-gradient-to-br from-brand-500 to-brand-800 text-white shadow-float col-span-2 sm:col-span-1 sm:row-span-2'
                : 'card hover:border-brand-200'}`}>
              <div className="flex items-start justify-between">
                <span className={`grid size-11 place-items-center rounded-xl ${big ? 'bg-white text-brand-700' : 'border border-line bg-surface text-brand-700'}`}>
                  <Icon className="size-5" />
                </span>
                <ArrowUpRight className={`size-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${big ? 'text-white/80' : 'text-muted'}`} />
              </div>
              <div className="mt-auto pt-8">
                <h3 className={`font-semibold ${big ? 'text-2xl' : 'text-base sm:text-lg'}`}>{g.label}</h3>
                <p className={`mt-1 line-clamp-1 text-xs sm:text-sm ${big ? 'text-white/75' : 'text-muted'}`}>{g.blurb}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                  <span className={`rounded-full px-2 py-0.5 font-semibold ${big ? 'bg-white/15' : 'bg-brand-50 text-brand-700'}`}>{count} productos</span>
                  <span className={big ? 'text-white/75' : 'text-muted'}>desde {formatPrice(from)}</span>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </section>
  )
}
