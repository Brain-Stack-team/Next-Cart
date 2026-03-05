"use client"

import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { toast } from "sonner"

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_10px_28px_-22px_rgba(15,23,42,0.9)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_22px_45px_-24px_rgba(15,23,42,0.45)]">
      <Link href={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          crossOrigin="anonymous"
          loading="lazy"
          decoding="async"
        />

        {product.discount > 0 && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-rose-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
            -{product.discount}%
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3.5 sm:p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">{product.category}</p>

        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="line-clamp-2 text-sm font-bold leading-5 text-slate-900 transition-colors duration-300 hover:text-primary">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 text-xs">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="font-semibold text-slate-800">{product.rating}</span>
          <span className="text-slate-500">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="mt-auto flex items-end gap-2 pt-1">
          <span className="text-xl font-extrabold leading-none text-primary">${product.price.toFixed(2)}</span>
          {product.discount > 0 && product.originalPrice > product.price && (
            <span className="pb-0.5 text-xs text-slate-400 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        <button
          onClick={() => {
            addItem(product)
            toast.success(`${product.name} added to cart`)
          }}
          className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:brightness-95"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </article>
  )
}
