import { products } from "@/lib/data"
import ProductCard from "@/components/product-card"
import { TrendingUp } from "lucide-react"

export default function TrendingProducts({
  title = "Trending Now",
  subtitle = "Popular products loved by shoppers this week.",
  limit = 8,
  excludeProductId,
  className = "",
}) {
  const trending = products
    .filter((product) => product.tags.includes("trending") && product.id !== excludeProductId)
    .slice(0, limit)

  if (!trending.length) return null

  return (
    <section className={`mx-4 mt-14 rounded-3xl bg-white px-4 py-14 sm:px-6 md:px-8 lg:mx-0 lg:mt-16 lg:px-10 lg:py-16 ${className}`}>
      <div className="mx-auto max-w-3xl text-center">
        <div className="flex items-center justify-center gap-2.5">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{title}</h2>
        </div>

        <p className="mt-2 text-sm text-slate-600 md:text-base">{subtitle}</p>
      </div>

      <div className="mt-8 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-4">
        {trending.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
