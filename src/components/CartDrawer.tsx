import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { imageFor } from '../data/catalog'
import { formatPrice } from '../lib/format'
import { useCart, useCartSummary, whatsappOrderUrl } from '../store/cart'
import { goToCatalog } from '../store/filters'

export function CartDrawer() {
  const { open, setOpen, setQty, add, remove, clear } = useCart()
  const { lines, count, total } = useCartSummary()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [open, setOpen])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Tu pedido">
          <motion.div className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
          <motion.aside
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-canvas shadow-2xl sm:m-3 sm:rounded-2xl sm:border sm:border-line">
            <header className="flex items-center justify-between border-b border-line bg-white px-5 py-4 sm:rounded-t-2xl">
              <div>
                <h2 className="text-lg font-bold tracking-tight">Tu pedido</h2>
                <p className="text-xs text-muted">{count} {count === 1 ? 'producto' : 'productos'}</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Cerrar"
                className="grid size-9 place-items-center rounded-xl border border-line bg-white hover:bg-surface">
                <X className="size-4" />
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="grid flex-1 place-items-center p-8 text-center">
                <div>
                  <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-brand-50 text-brand-700"><ShoppingBag className="size-7" /></span>
                  <p className="mt-4 font-semibold">Tu pedido está vacío</p>
                  <p className="mt-1 text-sm text-muted">Sumá productos desde el catálogo.</p>
                  <button onClick={() => { setOpen(false); goToCatalog() }}
                    className="mt-5 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white">Ir al catálogo</button>
                </div>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-2 overflow-y-auto p-3">
                  <AnimatePresence initial={false}>
                    {lines.map(({ product: p, qty, subtotal }) => (
                      <motion.li key={p.id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40, height: 0 }}
                        className="flex gap-3 rounded-2xl border border-line bg-white p-2.5">
                        <div className="grid size-20 shrink-0 place-items-center rounded-xl bg-surface">
                          <img src={imageFor(p)} alt="" className="h-16 w-16 object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-600">{p.brand}</p>
                          <p className="line-clamp-2 text-sm leading-snug">{p.name}</p>
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex h-8 items-center rounded-lg border border-line">
                              <button onClick={() => setQty(p.id, qty - 1)} aria-label="Quitar uno" className="grid h-full w-8 place-items-center"><Minus className="size-3.5" /></button>
                              <span className="w-6 text-center text-sm font-semibold tabular-nums">{qty}</span>
                              <button onClick={() => add(p.id)} aria-label="Sumar uno" className="grid h-full w-8 place-items-center"><Plus className="size-3.5" /></button>
                            </div>
                            <span className="font-bold tabular-nums">{formatPrice(subtotal)}</span>
                          </div>
                        </div>
                        <button onClick={() => remove(p.id)} aria-label={`Eliminar ${p.name}`}
                          className="self-start rounded-lg p-1.5 text-muted hover:bg-red-50 hover:text-red-600">
                          <Trash2 className="size-4" />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <footer className="space-y-3 border-t border-line bg-white p-5 sm:rounded-b-2xl">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-muted">Total estimado</span>
                    <span className="text-2xl font-bold tracking-tight tabular-nums">{formatPrice(total)}</span>
                  </div>
                  <p className="text-xs text-muted">Confirmamos stock, forma de pago y envío por WhatsApp.</p>
                  <a href={whatsappOrderUrl(lines, total)} target="_blank" rel="noreferrer"
                    className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#1faa53] text-[15px] font-semibold text-white shadow-float transition hover:bg-[#178c44] active:scale-[.99]">
                    <WhatsAppIcon className="size-5" /> Enviar pedido por WhatsApp
                  </a>
                  <button onClick={clear} className="w-full text-center text-xs font-medium text-muted hover:text-red-600">Vaciar pedido</button>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.3 4.8 4.9-1.3A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-2.9.76.78-2.83-.2-.3a8.2 8.2 0 1 1 6.82 3.7Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.13-.55.12-.17.24-.64.8-.78.96-.15.17-.29.19-.54.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.43l-.75-1.8c-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.86 2.04 4.76 4.76 0 0 0 1 2.53 10.9 10.9 0 0 0 4.17 3.68c1.55.67 2.16.73 2.94.61.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.15-1.17-.06-.1-.22-.17-.47-.29Z" />
    </svg>
  )
}
