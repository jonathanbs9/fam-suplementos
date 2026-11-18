import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { formatPrice } from '../lib/format'
import { useCart, useCartSummary } from '../store/cart'

/** Resumen flotante en mobile cuando hay productos en el pedido. */
export function FloatingCart() {
  const { count, total } = useCartSummary()
  const { open, setOpen } = useCart()
  return (
    <AnimatePresence>
      {count > 0 && !open && (
        <motion.button initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }}
          onClick={() => setOpen(true)}
          className="fixed inset-x-3 bottom-3 z-30 flex items-center justify-between rounded-2xl bg-ink px-5 py-3.5 text-white shadow-2xl sm:hidden">
          <span className="text-sm"><b className="text-lime">{count}</b> en tu pedido · <b>{formatPrice(total)}</b></span>
          <span className="flex items-center gap-1 text-sm font-semibold">Ver <ArrowRight className="size-4" /></span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
