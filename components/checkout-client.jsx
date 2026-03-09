"use client"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { CreditCard, Truck, CheckCircle, MapPin, Package } from "lucide-react"
import Link from "next/link"

const deliveryMethods = [
  { id: "standard", label: "Standard Delivery", desc: "5-7 business days", price: 0 },
  { id: "express", label: "Express Delivery", desc: "2-3 business days", price: 9.99 },
  { id: "overnight", label: "Overnight", desc: "Next business day", price: 19.99 },
]

const paymentMethods = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "cod", label: "Cash on Delivery", icon: Package },
]

export default function CheckoutClient() {
  const { items, subtotal, clearCart } = useCart()
  const [delivery, setDelivery] = useState("standard")
  const [payment, setPayment] = useState("card")
  const [placed, setPlaced] = useState(false)

  const deliveryPrice = deliveryMethods.find((d) => d.id === delivery)?.price || 0
  const total = subtotal + deliveryPrice

  if (placed) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-chart-3/10 flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-chart-3" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Order Placed Successfully!</h2>
        <p className="text-muted-foreground mb-2">Your order #ORD-2026-{Math.floor(Math.random() * 9999).toString().padStart(4, "0")} has been confirmed.</p>
        <p className="text-sm text-muted-foreground mb-8">You will receive a confirmation email shortly.</p>
        <div className="flex gap-3">
          <Link href="/dashboard" className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:opacity-90 transition">
            Track Order
          </Link>
          <Link href="/products" className="bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-medium hover:bg-secondary/80 transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 flex flex-col items-center text-center">
        <p className="text-muted-foreground mb-4">Your cart is empty. Add items before checking out.</p>
        <Link href="/products" className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:opacity-90 transition">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-8">
          {/* Shipping Address */}
          <section className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-card-foreground">Shipping Address</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">First Name</label>
                <input className="w-full rounded-lg bg-secondary text-secondary-foreground px-3 py-2.5 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="John" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Last Name</label>
                <input className="w-full rounded-lg bg-secondary text-secondary-foreground px-3 py-2.5 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Doe" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-muted-foreground mb-1 block">Address</label>
                <input className="w-full rounded-lg bg-secondary text-secondary-foreground px-3 py-2.5 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="123 Main St" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">City</label>
                <input className="w-full rounded-lg bg-secondary text-secondary-foreground px-3 py-2.5 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="San Francisco" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">ZIP Code</label>
                <input className="w-full rounded-lg bg-secondary text-secondary-foreground px-3 py-2.5 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="94102" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Phone</label>
                <input className="w-full rounded-lg bg-secondary text-secondary-foreground px-3 py-2.5 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="+1 (555) 123-4567" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Email</label>
                <input className="w-full rounded-lg bg-secondary text-secondary-foreground px-3 py-2.5 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="john@example.com" />
              </div>
            </div>
          </section>

          {/* Delivery Method */}
          <section className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <Truck className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-card-foreground">Delivery Method</h3>
            </div>
            <div className="flex flex-col gap-3">
              {deliveryMethods.map((d) => (
                <label
                  key={d.id}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${
                    delivery === d.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      value={d.id}
                      checked={delivery === d.id}
                      onChange={() => setDelivery(d.id)}
                      className="accent-primary"
                    />
                    <div>
                      <p className="text-sm font-medium text-card-foreground">{d.label}</p>
                      <p className="text-xs text-muted-foreground">{d.desc}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-medium ${d.price === 0 ? "text-chart-3" : "text-card-foreground"}`}>
                    {d.price === 0 ? "Free" : `$${d.price.toFixed(2)}`}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Payment */}
          <section className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <CreditCard className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-card-foreground">Payment Method</h3>
            </div>
            <div className="flex flex-col gap-3">
              {paymentMethods.map((p) => {
                const Icon = p.icon
                return (
                  <label
                    key={p.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${
                      payment === p.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={p.id}
                      checked={payment === p.id}
                      onChange={() => setPayment(p.id)}
                      className="accent-primary"
                    />
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-card-foreground">{p.label}</span>
                  </label>
                )
              })}
            </div>

            {payment === "card" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                <div className="sm:col-span-2">
                  <label className="text-sm text-muted-foreground mb-1 block">Card Number</label>
                  <input className="w-full rounded-lg bg-secondary text-secondary-foreground px-3 py-2.5 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="1234 5678 9012 3456" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Expiry</label>
                  <input className="w-full rounded-lg bg-secondary text-secondary-foreground px-3 py-2.5 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="MM/YY" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">CVV</label>
                  <input className="w-full rounded-lg bg-secondary text-secondary-foreground px-3 py-2.5 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="123" />
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Order summary */}
        <div className="lg:w-96 shrink-0">
          <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
            <h3 className="font-semibold text-lg text-card-foreground mb-5">Order Summary</h3>

            <div className="flex flex-col gap-3 mb-5">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" crossOrigin="anonymous" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-card-foreground truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-medium text-card-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <hr className="border-border mb-4" />

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-card-foreground font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className={`font-medium ${deliveryPrice === 0 ? "text-chart-3" : "text-card-foreground"}`}>
                  {deliveryPrice === 0 ? "Free" : `$${deliveryPrice.toFixed(2)}`}
                </span>
              </div>
              <hr className="border-border" />
              <div className="flex justify-between text-base">
                <span className="font-semibold text-card-foreground">Total</span>
                <span className="font-bold text-card-foreground">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => { clearCart(); setPlaced(true) }}
              className="w-full mt-6 bg-accent text-accent-foreground py-3 rounded-xl font-medium hover:opacity-90 transition cursor-pointer"
            >
              Place Order - ${total.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
