import Navbar from "@/components/navbar"
import HeroBanner from "@/components/hero-banner"
import FeaturesSection from "@/components/features-section"
import CategoryGrid from "@/components/category-grid"
import FlashSale from "@/components/flash-sale"
import TrendingProducts from "@/components/trending-products"
import RecommendedProducts from "@/components/recommended-products"
import SellerHighlights from "@/components/seller-highlights"
import PromoSplitSection from "@/components/promo-split-section"
import Footer from "@/components/footer"
import MobileBottomNav from "@/components/mobile-bottom-nav"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto pb-24 lg:pb-0">
        <HeroBanner />
        
        <CategoryGrid />
        <FlashSale />
        <TrendingProducts />
        <RecommendedProducts />
        <SellerHighlights />
        <PromoSplitSection />
        <FeaturesSection />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  )
}
