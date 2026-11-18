import { memo } from 'react'
import { motion } from 'motion/react'
import { Minus, Plus, ShoppingBag } from 'lucide-react'
import { GROUP_BY_ID, imageFor, type Product } from '../data/catalog'
import { formatPrice } from '../lib/format'
import { useCart } from '../store/cart'

export const ProductCard = memo(function ProductCard({ product: p }: { product: Product }) {
  const qty = useCart((s) => s.items[p.id] ?? 0)
  const add = useCart((s) => s.add)
  const setQty = useCart((s) => s.setQty)

  return (
    <motion.article layout="position"
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition hover:border-brand-200 hover:shadow-lg">
      <div className="relative m-1.5 grid aspect-square place-items-center overflow-hidden rounded-xl bg-gradient-to-b from-surface to-[#eef1ef]">
        <img src={imageFor(p)} alt={p.name} loading="lazy" decoding="async"
          className="h-[78%] w-[78%] object-contain mix-blend-multiply transition duration-500 group-hover:scale-105" />
        <div className="absolute left-2 top-2 flex flex-wrap gap-1">
          {p.glutenFree && (
            <span className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-brand-700 ring-1 ring-brand-100">Sin TACC</span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-2 sm:px-4 sm:pb-4">
        <div className="flex items-center justify-between gap-2 text-[11px]">
          <span className="truncate font-semibold uppercase tracking-wider text-brand-600">{p.brand}</span>
          <span className="hidden shrink-0 text-muted sm:inline">{GROUP_BY_ID[p.group].label.split(' ')[0]}</span>
        </div>
        <h3 className="mt-1 line-clamp-2 min-h-[2.6em] text-sm font-medium leading-snug" title={p.name}>{p.name}</h3>

        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="text-lg font-bold tracking-tight">{formatPrice(p.price)}</span>
          {qty === 0 ? (
            <button onClick={() => add(p.id)} aria-label={`Agregar ${p.name}`}
              className="grid size-9 place-items-center rounded-xl bg-brand-700 text-white transition hover:bg-brand-800 active:scale-95 sm:flex sm:w-auto sm:gap-1.5 sm:px-3 sm:text-xs sm:font-semibold">
              <Plus className="size-4 sm:hidden" />
              <ShoppingBag className="hidden size-3.5 sm:block" />
              <span className="hidden sm:inline">Agregar</span>
            </button>
          ) : (
            <div className="flex h-9 items-center rounded-xl border border-brand-200 bg-brand-50 text-brand-800">
              <button onClick={() => setQty(p.id, qty - 1)} aria-label="Quitar uno" className="grid h-full w-8 place-items-center"><Minus className="size-3.5" /></button>
              <span className="w-5 text-center text-sm font-semibold tabular-nums">{qty}</span>
              <button onClick={() => add(p.id)} aria-label="Sumar uno" className="grid h-full w-8 place-items-center"><Plus className="size-3.5" /></button>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  )
})
