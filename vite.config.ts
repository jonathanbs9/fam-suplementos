import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build`        → build de producción normal (assets con hash, listo para Vercel/Netlify)
// `npm run build:single` → un único index.html autocontenido (para previsualizar/compartir)
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), ...(mode === 'single' ? [viteSingleFile()] : [])],
  build: mode === 'single'
    ? { outDir: 'dist-single', assetsInlineLimit: 100_000_000 }
    : { assetsInlineLimit: 0 }, // imágenes como archivos → carga diferida (lazy)
}))
