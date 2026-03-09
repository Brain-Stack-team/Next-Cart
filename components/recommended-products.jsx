import { products } from "@/lib/data"
import ProductCard from "@/components/product-card"
import { Sparkles } from "lucide-react"

export default function RecommendedProducts() {
  const recommended = products.filter((p) => p.tags.includes("recommended"))

  return (
    <section className="mt-10">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Recommended for You</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {recommended.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
