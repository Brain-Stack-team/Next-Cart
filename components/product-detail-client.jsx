"use client"

import { useState } from "react"
import { Star, Minus, Plus, ShoppingCart, Zap, Truck, Shield, Store } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { toast } from "sonner"

export default function ProductDetailClient({ product }) {
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const { addItem } = useCart()

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product)
    toast.success(`${qty}x ${product.name} added to cart`)
  }

  const tabs = [
    { id: "description", label: "Description" },
    { id: "reviews", label: "Reviews" },
    { id: "shipping", label: "Shipping" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Image */}
        <div className="lg:w-1/2">
          <div className="aspect-square rounded-2xl overflow-hidden bg-secondary border border-border">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              crossOrigin="anonymous"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2 flex flex-col gap-5">
          <div>
            <p className="text-sm text-primary font-medium mb-1">{product.category}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight text-balance">
              {product.name}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-border"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">${product.price.toFixed(2)}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-lg line-through text-muted-foreground">${product.originalPrice.toFixed(2)}</span>
                <span className="bg-accent/10 text-accent text-sm font-bold px-2 py-0.5 rounded-lg">
                  Save {product.discount}%
                </span>
              </>
            )}
          </div>

          {/* Stock */}
          <p className={`text-sm font-medium ${product.stock > 10 ? "text-chart-3" : "text-accent"}`}>
            {product.stock > 10 ? `In Stock (${product.stock} available)` : `Only ${product.stock} left!`}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-foreground">Quantity:</span>
            <div className="flex items-center border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-3 py-2 hover:bg-secondary transition text-foreground"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 text-sm font-medium min-w-[48px] text-center text-foreground">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="px-3 py-2 hover:bg-secondary transition text-foreground"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:opacity-90 transition cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-accent text-accent-foreground py-3 rounded-xl font-medium hover:opacity-90 transition cursor-pointer"
            >
              <Zap className="w-5 h-5" />
              Buy Now
            </button>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="w-4 h-4 text-primary" /> Free shipping over $50
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-primary" /> 30-day guarantee
            </div>
          </div>

          {/* Seller info */}
          <div className="bg-secondary rounded-xl p-4 flex items-center gap-3 mt-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Store className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-secondary-foreground">{product.seller}</p>
              <p className="text-xs text-muted-foreground">Verified Seller</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex gap-1 border-b border-border">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-5 py-3 text-sm font-medium transition border-b-2 -mb-[1px] ${
                activeTab === t.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="py-6">
          {activeTab === "description" && (
            <p className="text-foreground leading-relaxed">{product.description}</p>
          )}
          {activeTab === "reviews" && (
            <div className="flex flex-col gap-4">
              {[5, 4, 3].map((stars) => (
                <div key={stars} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground">Great product! Highly recommended for the quality and value.</p>
                  <p className="text-xs text-muted-foreground mt-2">Customer - 2 days ago</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === "shipping" && (
            <div className="flex flex-col gap-3 text-sm text-foreground">
              <p>Standard shipping: 5-7 business days</p>
              <p>Express shipping: 2-3 business days</p>
              <p>Free shipping on orders over $50</p>
              <p>Returns accepted within 30 days of delivery</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
