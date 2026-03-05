import { products } from "@/lib/data"
import ProductCard from "@/components/product-card"
import { Sparkles } from "lucide-react"

export default function RecommendedProducts() {
  const recommended = products.filter((p) => p.tags.includes("recommended"))

  return (
    <section className="mx-4 mt-14 rounded-3xl bg-[linear-gradient(140deg,#f9fafc_0%,#f2f5fb_100%)] px-4 py-14 sm:px-6 md:px-7 lg:mx-0 lg:mt-16 lg:py-16">
<div className="mx-auto max-w-3xl text-center">
  <div className="flex items-center justify-center gap-2">
    <Sparkles className="h-6 w-6 text-primary shrink-0" />
    <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
      Recommended For You
    </h2>
  </div>

  <p className="mt-2 text-sm text-slate-600 md:text-base">
    Handpicked items matched to your interests and best-value buying trends.
  </p>
</div>

      <div className="mt-8 grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {recommended.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
