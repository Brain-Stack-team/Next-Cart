import Link from "next/link"
import {
  Monitor, Shirt, Sparkles, Home, Dumbbell, BookOpen, Gamepad2, ShoppingBasket,
} from "lucide-react"
import { categories } from "@/lib/data"

const iconMap = { Monitor, Shirt, Sparkles, Home, Dumbbell, BookOpen, Gamepad2, ShoppingBasket }

export default function CategoryGrid() {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-foreground mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {categories.map((c) => {
          const Icon = iconMap[c.icon]
          return (
            <Link
              key={c.id}
              href={`/products?category=${c.slug}`}
              className="flex flex-col items-center gap-3 p-4 bg-card border border-border rounded-xl hover:shadow-md hover:border-primary/30 transition group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition">
                {Icon && <Icon className="w-6 h-6 text-primary" />}
              </div>
              <span className="text-sm font-medium text-card-foreground text-center">{c.name}</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
