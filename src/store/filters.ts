import { create } from 'zustand'
import type { GroupId } from '../data/catalog'

export type SortKey = 'relevance' | 'price-asc' | 'price-desc' | 'name'

interface FilterState {
  query: string
  group: GroupId | 'all'
  brand: string | 'all'
  glutenFree: boolean
  sort: SortKey
  set: (patch: Partial<Omit<FilterState, 'set' | 'reset'>>) => void
  reset: () => void
}

const initial = { query: '', group: 'all' as const, brand: 'all', glutenFree: false, sort: 'relevance' as SortKey }

export const useFilters = create<FilterState>()((set) => ({
  ...initial,
  set: (patch) => set(patch),
  reset: () => set(initial),
}))

export const goToCatalog = () =>
  document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

export const focusSearch = () => {
  goToCatalog()
  window.setTimeout(() => document.getElementById('catalog-search')?.focus({ preventScroll: true }), 350)
}
