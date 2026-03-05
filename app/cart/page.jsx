import Navbar from "@/components/navbar"
import CartClient from "@/components/cart-client"
import Footer from "@/components/footer"
import MobileBottomNav from "@/components/mobile-bottom-nav"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pb-24 lg:pb-0">
        <CartClient />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  )
}
