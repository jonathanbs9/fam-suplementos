import { create } from 'zustand'
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware'
import { PRODUCTS, CONTACT, type Product } from '../data/catalog'
import { formatPrice } from '../lib/format'

/** localStorage puede no estar disponible (modo privado, iframes): degradamos a memoria. */
const memory = new Map<string, string>()
const safeStorage: StateStorage = {
  getItem: (k) => { try { return localStorage.getItem(k) } catch { return memory.get(k) ?? null } },
  setItem: (k, v) => { try { localStorage.setItem(k, v) } catch { memory.set(k, v) } },
  removeItem: (k) => { try { localStorage.removeItem(k) } catch { memory.delete(k) } },
}

const byId = new Map(PRODUCTS.map((p) => [p.id, p]))

interface CartState {
  items: Record<string, number>
  open: boolean
  add: (id: string, qty?: number) => void
  setQty: (id: string, qty: number) => void
  remove: (id: string) => void
  clear: () => void
  setOpen: (open: boolean) => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: {},
      open: false,
      add: (id, qty = 1) => set((s) => ({ items: { ...s.items, [id]: (s.items[id] ?? 0) + qty } })),
      setQty: (id, qty) =>
        set((s) => {
          const items = { ...s.items }
          if (qty <= 0) delete items[id]
          else items[id] = Math.min(qty, 99)
          return { items }
        }),
      remove: (id) => set((s) => { const items = { ...s.items }; delete items[id]; return { items } }),
      clear: () => set({ items: {} }),
      setOpen: (open) => set({ open }),
    }),
    {
      name: 'fam-cart',
      storage: createJSONStorage(() => safeStorage),
      partialize: (s) => ({ items: s.items }),
    },
  ),
)

export interface Line { product: Product; qty: number; subtotal: number }

export const selectLines = (items: Record<string, number>): Line[] =>
  Object.entries(items).flatMap(([id, qty]) => {
    const product = byId.get(id)
    return product ? [{ product, qty, subtotal: product.price * qty }] : []
  })

export const useCartSummary = () => {
  const items = useCart((s) => s.items)
  const lines = selectLines(items)
  return {
    lines,
    count: lines.reduce((a, l) => a + l.qty, 0),
    total: lines.reduce((a, l) => a + l.subtotal, 0),
  }
}

export const whatsappOrderUrl = (lines: Line[], total: number) => {
  const body = [
    '¡Hola FAM Suplementos! 👋 Quiero hacer este pedido:',
    '',
    ...lines.map((l) => `• ${l.qty} × ${l.product.brand} — ${l.product.name} (${formatPrice(l.subtotal)})`),
    '',
    `*Total estimado: ${formatPrice(total)}*`,
    '',
    '¿Me confirman disponibilidad, forma de pago y envío? ¡Gracias!',
  ].join('\n')
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(body)}`
}

export const whatsappUrl = (text = '¡Hola FAM Suplementos! Quería hacer una consulta 🙂') =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`
