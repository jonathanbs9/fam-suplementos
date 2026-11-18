import raw from './catalog.json'
import {
  Apple, Bean, Beaker, Droplets, Dumbbell, Flame, Leaf, Package, Pill, Sparkles, Zap,
  type LucideIcon,
} from 'lucide-react'

export type GroupId =
  | 'proteinas' | 'creatinas' | 'rendimiento' | 'aminoacidos' | 'ganadores' | 'quemadores'
  | 'colagenos' | 'vitaminas' | 'hidratacion' | 'snacks' | 'accesorios'

export interface Product {
  id: string
  brand: string
  /** Categoría original de la lista de precios (ej. "Proteína - Blend") */
  category: string
  group: GroupId
  name: string
  /** Precio en ARS */
  price: number
  glutenFree: boolean
  image: string
}

export interface Group {
  id: GroupId
  label: string
  blurb: string
  icon: LucideIcon
}

export const GROUPS: Group[] = [
  { id: 'proteinas', label: 'Proteínas', blurb: 'Whey, blends, veganas y caseína', icon: Dumbbell },
  { id: 'creatinas', label: 'Creatinas', blurb: 'Fuerza y potencia', icon: Zap },
  { id: 'rendimiento', label: 'Pre-entreno', blurb: 'Energía, foco y bombeo', icon: Flame },
  { id: 'aminoacidos', label: 'Aminoácidos', blurb: 'BCAA, glutamina y más', icon: Beaker },
  { id: 'ganadores', label: 'Ganadores de peso', blurb: 'Volumen y carbohidratos', icon: Bean },
  { id: 'quemadores', label: 'Quemadores', blurb: 'Termogénicos y carnitina', icon: Sparkles },
  { id: 'colagenos', label: 'Colágenos', blurb: 'Articulaciones, piel y pelo', icon: Leaf },
  { id: 'vitaminas', label: 'Vitaminas y minerales', blurb: 'Magnesio, omega 3, multis', icon: Pill },
  { id: 'hidratacion', label: 'Hidratación', blurb: 'Isotónicas y geles', icon: Droplets },
  { id: 'snacks', label: 'Snacks y alimentos', blurb: 'Barras, cremas y funcionales', icon: Apple },
  { id: 'accesorios', label: 'Accesorios', blurb: 'Shakers y almohadas', icon: Package },
]

export const GROUP_BY_ID = Object.fromEntries(GROUPS.map((g) => [g.id, g])) as Record<GroupId, Group>

const images = import.meta.glob<string>('../assets/products/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

export const imageFor = (p: Product) => images[`../assets/products/${p.image}.webp`]

export const PRODUCTS = raw as Product[]

export const BRANDS = [...new Set(PRODUCTS.map((p) => p.brand))].sort((a, b) =>
  a.localeCompare(b, 'es'),
)

export const STATS = {
  products: PRODUCTS.length,
  brands: BRANDS.length,
  glutenFree: PRODUCTS.filter((p) => p.glutenFree).length,
}

export const groupStats = (id: GroupId) => {
  const items = PRODUCTS.filter((p) => p.group === id)
  return { count: items.length, from: Math.min(...items.map((p) => p.price)) }
}

/** Productos destacados para el hero (elegidos de la lista) */
export const FEATURED_IDS = [
  'star-nutrition-platinum-whey-protein-chocolate-suizo-2-lb-907-gr',
  'star-nutrition-pump-v8-citrus-slush-285-gr',
  'star-nutrition-citrato-de-magnesio-500-gr',
]

export const CONTACT = {
  whatsapp: '5491138663117',
  whatsappLabel: '+54 9 11 3866-3117',
  instagram: 'suplementosfam',
}
