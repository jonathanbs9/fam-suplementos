# FAM Suplementos — Landing + catálogo

Landing page de venta para **FAM Suplementos**, con el catálogo completo de la lista de precios (515 productos, 24 marcas) y pedido por WhatsApp.

## Stack

- **React 19** + **TypeScript** (strict) + **Vite 8**
- **Tailwind CSS v4** (configuración CSS-first con `@theme` en `src/index.css`)
- **Motion** (ex Framer Motion) para animaciones
- **Zustand** para el carrito (persistido en `localStorage`) y los filtros
- **lucide-react** para íconos

## Scripts

```bash
npm install
npm run dev           # desarrollo en http://localhost:5173
npm run build         # build de producción en dist/ (listo para Vercel, Netlify, Cloudflare Pages)
npm run build:single  # un único index.html autocontenido en dist-single/ (para compartir/previsualizar)
npm run lint          # oxlint
```

## Estructura

```
src/
  data/
    catalog.json      ← productos extraídos del PDF (marca, categoría, nombre, precio, Sin TACC, imagen)
    catalog.ts        ← tipos, categorías agrupadas, marcas, datos de contacto
  assets/products/    ← fotos de producto (webp) extraídas del PDF
  store/
    cart.ts           ← carrito + armado del mensaje de WhatsApp
    filters.ts        ← búsqueda, categoría, marca, Sin TACC y orden
  components/         ← Navbar, Hero, Categories, Brands, Catalog, ProductCard, CartDrawer, HowToBuy, Footer
```

## Cómo actualizar precios

Editá `src/data/catalog.json`. Cada producto tiene esta forma:

```json
{ "id": "star-nutrition-creatina-...", "brand": "Star Nutrition", "category": "Creatina",
  "group": "creatinas", "name": "Creatina Monohidrato 300 Gr", "price": 26000,
  "glutenFree": true, "image": "p123" }
```

`group` debe ser uno de los ids definidos en `GROUPS` (`catalog.ts`). `image` es el nombre del archivo en `src/assets/products/` (sin `.webp`).

## Contacto / checkout

El número de WhatsApp y el usuario de Instagram están en `CONTACT` (`src/data/catalog.ts`). El botón **Enviar pedido por WhatsApp** abre `wa.me` con el detalle del pedido, cantidades y total estimado.

## Funcionalidades

- Hero con producto destacado y gráfico interactivo de categorías (estilo dashboard)
- 11 categorías agrupadas con cantidad y precio "desde"
- Carrusel de marcas (clic = filtra por marca)
- Catálogo con búsqueda sin acentos (⌘K / Ctrl+K o `/`), filtro por categoría, marca y Sin TACC, orden por precio o nombre y paginación
- Carrito lateral persistente + barra flotante en mobile
- Responsive y accesible (foco visible, navegación por teclado, `Esc` cierra el carrito)
