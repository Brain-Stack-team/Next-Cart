"use client"

import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { toast } from "sonner"

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <div className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          crossOrigin="anonymous"
        />
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-lg">
            -{product.discount}%
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <p className="text-xs text-muted-foreground">{product.category}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-medium text-sm text-card-foreground leading-snug line-clamp-2 hover:text-primary transition">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-accent text-accent" />
          <span className="text-xs font-medium text-card-foreground">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-2">
          <span className="text-lg font-bold text-card-foreground">${product.price.toFixed(2)}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm line-through text-muted-foreground">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Add to cart */}
        <button
          onClick={() => {
            addItem(product)
            toast.success(`${product.name} added to cart`)
          }}
          className="w-full mt-2 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition cursor-pointer"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  )
}
