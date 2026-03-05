import Navbar from "@/components/navbar"
import CheckoutClient from "@/components/checkout-client"
import Footer from "@/components/footer"
import MobileBottomNav from "@/components/mobile-bottom-nav"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pb-24 lg:pb-0">
        <CheckoutClient />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  )
}
