import { sellers } from "@/lib/data"
import { Star, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function SellerHighlights() {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-foreground mb-6">Top Sellers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sellers.map((s) => (
          <div
            key={s.id}
            className="bg-card border border-border rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition"
          >
            <img
              src={s.image}
              alt={s.name}
              className="w-14 h-14 rounded-full object-cover"
              crossOrigin="anonymous"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm text-card-foreground truncate">{s.name}</h4>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                <span className="text-xs font-medium text-card-foreground">{s.rating}</span>
                <span className="text-xs text-muted-foreground">- {s.products} items</span>
              </div>
            </div>
            <Link href="/products" className="text-primary hover:opacity-80 transition">
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
