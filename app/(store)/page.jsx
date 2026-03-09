import HeroBanner from "@/components/hero-banner"
import CategoryGrid from "@/components/category-grid"
import FlashSale from "@/components/flash-sale"
import TrendingProducts from "@/components/trending-products"
import RecommendedProducts from "@/components/recommended-products"
import SellerHighlights from "@/components/seller-highlights"

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-16">
      <HeroBanner />
      <CategoryGrid />
      <FlashSale />
      <TrendingProducts />
      <SellerHighlights />
      <RecommendedProducts />
    </div>
  )
}
