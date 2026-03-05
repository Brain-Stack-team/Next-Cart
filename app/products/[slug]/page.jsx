import { notFound } from "next/navigation"
import Navbar from "@/components/navbar"
import ProductDetailClient from "@/components/product-detail-client"
import TrendingProducts from "@/components/trending-products"
import Footer from "@/components/footer"
import MobileBottomNav from "@/components/mobile-bottom-nav"
import { products } from "@/lib/data"

export default async function ProductDetailPage({ params }) {
  const { slug } = await params
  const product = products.find((item) => item.slug === slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pb-24 lg:pb-0">
        <ProductDetailClient product={product} />
        <div className="max-w-7xl mx-auto pb-6">
          <TrendingProducts limit={4} excludeProductId={product.id} />
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  )
}
