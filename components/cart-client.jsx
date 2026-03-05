"use client"

import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react"
import { useState } from "react"

export default function CartClient() {
  const { items, subtotal, updateQuantity, removeItem } = useCart()
  const [promo, setPromo] = useState("")
  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Discover our amazing products and start shopping</p>
        <Link
          href="/products"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-8">Shopping Cart ({items.length} items)</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart items */}
        <div className="flex-1 flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-card border border-border rounded-xl p-4 flex gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 rounded-lg object-cover shrink-0"
                crossOrigin="anonymous"
              />
              <div className="flex-1 min-w-0">
                <Link href={`/products/${item.slug}`}>
                  <h3 className="font-medium text-card-foreground hover:text-primary transition truncate">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground mt-0.5">{item.category}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1.5 hover:bg-secondary transition text-card-foreground"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 py-1.5 text-sm font-medium text-card-foreground">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1.5 hover:bg-secondary transition text-card-foreground"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="font-bold text-card-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="self-start p-2 text-muted-foreground hover:text-destructive transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:w-96 shrink-0">
          <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
            <h3 className="font-semibold text-lg text-card-foreground mb-5">Order Summary</h3>

            {/* Promo */}
            <div className="flex gap-2 mb-5">
              <div className="flex-1 relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="Promo code"
                  className="w-full rounded-lg bg-secondary text-secondary-foreground pl-9 pr-3 py-2.5 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <button className="bg-secondary text-secondary-foreground px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary/80 transition">
                Apply
              </button>
            </div>

            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-card-foreground font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className={`font-medium ${shipping === 0 ? "text-chart-3" : "text-card-foreground"}`}>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <hr className="border-border" />
              <div className="flex justify-between text-base">
                <span className="font-semibold text-card-foreground">Total</span>
                <span className="font-bold text-card-foreground">${total.toFixed(2)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full mt-6 flex items-center justify-center gap-2 bg-accent text-accent-foreground py-3 rounded-xl font-medium hover:opacity-90 transition"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/products"
              className="w-full mt-3 flex items-center justify-center text-sm text-muted-foreground hover:text-foreground transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
