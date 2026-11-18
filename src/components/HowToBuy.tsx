import { motion } from 'motion/react'
import { MessageCircle, PackageCheck, ShoppingBag } from 'lucide-react'
import { SectionHeading } from './SectionHeading'

const STEPS = [
  { icon: ShoppingBag, title: 'Armá tu pedido', text: 'Buscá por categoría, marca o sabor y sumá los productos que quieras.' },
  { icon: MessageCircle, title: 'Envialo por WhatsApp', text: 'Con un clic nos llega el detalle completo con cantidades y total estimado.' },
  { icon: PackageCheck, title: 'Coordinamos y listo', text: 'Te confirmamos stock, forma de pago y entrega para que lo recibas sin vueltas.' },
]

export function HowToBuy() {
  return (
    <section id="como-comprar" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHeading eyebrow="Cómo comprar" title="Tres pasos, cero complicaciones" />
      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <motion.li key={s.title}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="card relative p-6">
            <span className="absolute right-5 top-4 font-mono text-5xl font-medium text-line">0{i + 1}</span>
            <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-700"><s.icon className="size-5" /></span>
            <h3 className="mt-6 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}
