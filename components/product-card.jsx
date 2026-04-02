"use client"

import Link from "next/link"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { toast } from "sonner"

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <div className="bg-white rounded-[16px] border border-gray-100 overflow-hidden group hover:shadow-lg hover:border-gray-200 transition-all duration-300 flex flex-col relative">
      <div className="relative aspect-square overflow-hidden bg-gray-50 flex-shrink-0">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            crossOrigin="anonymous"
          />
        </Link>
        {product.discount > 0 && (
          <span className="absolute top-2.5 left-2.5 bg-[#ff4757] text-white text-[11px] font-bold px-2 py-0.5 rounded-full z-10 shadow-sm">
            -{product.discount}%
          </span>
        )}
        <button 
          className="absolute top-2.5 right-2.5 bg-white p-1.5 rounded-full shadow-sm text-gray-400 hover:text-red-500 transition-colors z-10 hover:scale-110 active:scale-95"
          onClick={(e) => { e.preventDefault(); toast.success('Added to wishlist'); }}
        >
          <Heart className="w-4 h-4" />
        </button>

        {/* Add to Cart Overlay */}
        <div className="absolute left-0 right-0 bottom-0 p-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(product);
              toast.success(`${product.name} added to cart`);
            }}
            className="w-full bg-white/95 backdrop-blur shadow-sm text-[#1f2937] hover:bg-white py-2 rounded-[10px] text-[13px] font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer pointer-events-auto"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 bg-white relative z-10">
        <p className="text-[11px] text-gray-400 font-medium mb-1 line-clamp-1">{product.brand || product.category}</p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-[13px] sm:text-[14px] font-bold text-[#1f2937] mb-1.5 leading-snug line-clamp-2 min-h-[38px] hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3.5 h-3.5 fill-[#fbbf24] text-[#fbbf24]" />
          <span className="text-[12px] font-bold text-gray-700">{product.rating}</span>
          <span className="text-[11px] text-gray-400 hidden sm:inline">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="mt-auto pt-2 flex flex-col gap-1 border-t border-transparent">
          <div className="flex items-center gap-2">
            <span className="text-[15px] sm:text-[16px] font-extrabold text-[#4f46e5]">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-[12px] text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="h-5">
            {product.stock && product.stock <= 15 ? (
               <span className="text-[11px] font-medium text-[#ff7675]">Only {product.stock} left in stock</span>
            ) : product.stock === null ? (
               <span className="text-[11px] font-medium text-[#ff7675]">Out of stock</span>
            ) : (
               <span className="text-[11px] font-medium text-emerald-500 hidden group-hover:block transition-all">In stock</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
