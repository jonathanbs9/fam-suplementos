import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MessageCircle, Search, ShoppingBag } from 'lucide-react'
import { Logo } from './Logo'
import { useCart, useCartSummary, whatsappUrl } from '../store/cart'
import { focusSearch } from '../store/filters'

const LINKS = [
  { href: '#categorias', label: 'Categorías' },
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#marcas', label: 'Marcas' },
  { href: '#como-comprar', label: 'Cómo comprar' },
]

export function Navbar() {
  const setOpen = useCart((s) => s.setOpen)
  const { count } = useCartSummary()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest('input, textarea, select')
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault()
        focusSearch()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="ml-6 hidden items-center gap-1 lg:flex" aria-label="Principal">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button onClick={focusSearch}
            className="hidden h-10 w-64 items-center gap-2 rounded-xl border border-line bg-surface px-3 text-sm text-muted transition hover:border-brand-200 md:flex">
            <Search className="size-4" />
            Buscar productos
            <kbd className="ml-auto rounded-md border border-line bg-white px-1.5 font-mono text-[11px]">⌘K</kbd>
          </button>
          <button onClick={focusSearch} aria-label="Buscar"
            className="grid size-10 place-items-center rounded-xl border border-line bg-white md:hidden">
            <Search className="size-4" />
          </button>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Escribinos por WhatsApp"
            className="hidden size-10 place-items-center rounded-xl border border-line bg-white transition hover:border-brand-200 hover:text-brand-700 sm:grid">
            <MessageCircle className="size-4" />
          </a>
          <button onClick={() => setOpen(true)}
            className="relative flex h-10 items-center gap-2 rounded-xl bg-brand-700 px-3.5 text-sm font-semibold text-white shadow-float transition hover:bg-brand-800 active:scale-[.98]">
            <ShoppingBag className="size-4" />
            <span className="hidden sm:inline">Mi pedido</span>
            <AnimatePresence mode="popLayout">
              {count > 0 && (
                <motion.span key={count} initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  className="grid min-w-5 place-items-center rounded-full bg-lime px-1.5 text-[11px] font-bold text-brand-900">
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </header>
  )
}
