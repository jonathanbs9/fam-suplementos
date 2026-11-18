import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Categories } from './components/Categories'
import { Brands } from './components/Brands'
import { Catalog } from './components/Catalog'
import { HowToBuy } from './components/HowToBuy'
import { CtaBand, Footer } from './components/Footer'
import { CartDrawer } from './components/CartDrawer'
import { FloatingCart } from './components/FloatingCart'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <Brands />
        <Catalog />
        <HowToBuy />
        <CtaBand />
      </main>
      <Footer />
      <CartDrawer />
      <FloatingCart />
    </>
  )
}
