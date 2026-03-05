import { Suspense } from "react"
import Navbar from "@/components/navbar"
import ProductListingClient from "@/components/product-listing-client"
import Footer from "@/components/footer"
import MobileBottomNav from "@/components/mobile-bottom-nav"

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pb-24 lg:pb-0">
        <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8 text-muted-foreground">Loading products...</div>}>
          <ProductListingClient />
        </Suspense>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  )
}
