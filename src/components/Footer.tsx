import { CONTACT, GROUPS } from '../data/catalog'
import { whatsappUrl } from '../store/cart'
import { goToCatalog, useFilters } from '../store/filters'
import { WhatsAppIcon } from './CartDrawer'
import { Logo } from './Logo'

const YEAR = new Date().getFullYear()

export function CtaBand() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 via-brand-700 to-brand-900 px-6 py-14 text-white sm:px-12">
        <div aria-hidden className="absolute -right-24 -top-24 size-96 rounded-full bg-lime/20 blur-3xl" />
        <div aria-hidden className="absolute -bottom-32 left-10 size-80 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-[-0.03em] sm:text-4xl">¿No sabés qué elegir?</h2>
            <p className="mt-3 text-white/80">Contanos tu objetivo y te ayudamos a armar el combo ideal.</p>
          </div>
          <a href={whatsappUrl('¡Hola FAM! Quiero asesoramiento para elegir suplementos 💪')} target="_blank" rel="noreferrer"
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-xl bg-white px-5 font-semibold text-brand-800 shadow-xl transition hover:bg-lime">
            <WhatsAppIcon className="size-5" /> Hablar con FAM
          </a>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const set = useFilters((s) => s.set)
  return (
    <footer className="mt-20 border-t border-line bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted">Nutrición · Salud · Rendimiento. Suplementos deportivos de las mejores marcas.</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Categorías</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted">
            {GROUPS.slice(0, 8).map((g) => (
              <li key={g.id}><button className="hover:text-brand-700" onClick={() => { set({ group: g.id }); goToCatalog() }}>{g.label}</button></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Contacto</p>
          <ul className="mt-3 space-y-2.5 text-sm text-muted">
            <li><a href={whatsappUrl()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-brand-700"><WhatsAppIcon className="size-4" />{CONTACT.whatsappLabel}</a></li>
            <li><a href={`https://instagram.com/${CONTACT.instagram}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-brand-700"><Instagram className="size-4" />@{CONTACT.instagram}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-muted sm:px-6">
          © {YEAR} FAM Suplementos. Precios sujetos a cambios sin previo aviso. Imágenes ilustrativas.
        </p>
      </div>
    </footer>
  )
}

function Instagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}
