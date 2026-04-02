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
        <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center mb-6 shadow-sm">
          <CheckCircle className="w-12 h-12 text-emerald-500" />
        </div>
        <h2 className="text-[28px] font-extrabold text-[#1f2937] mb-2 leading-tight">Order Placed Successfully!</h2>
        <p className="text-gray-500 font-medium mb-2">Your order <span className="text-[#1f2937] font-bold">#ORD-2026-{Math.floor(Math.random() * 9999).toString().padStart(4, "0")}</span> has been confirmed.</p>
        <p className="text-sm text-gray-400 mb-8">You will receive a confirmation email shortly.</p>
        <div className="flex gap-4">
          <Link href="/dashboard" className="bg-[#4f46e5] text-white px-8 py-3.5 rounded-[12px] font-bold hover:bg-indigo-600 transition-colors shadow-sm">
            Track Order
          </Link>
          <Link href="/products" className="bg-gray-100 text-gray-700 px-8 py-3.5 rounded-[12px] font-bold hover:bg-gray-200 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 flex flex-col items-center text-center">
        <p className="text-gray-500 mb-6 font-medium">Your cart is empty. Add items before checking out.</p>
        <Link href="/products" className="bg-[#4f46e5] text-white px-8 py-3.5 rounded-[12px] font-bold hover:bg-indigo-600 transition-colors shadow-sm">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 bg-gray-50 min-h-screen">
      <h1 className="text-[28px] font-extrabold text-[#1f2937] mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
        <div className="flex-1 flex flex-col gap-6">
          {/* Shipping Address */}
          <section className="bg-white border border-gray-100 rounded-[24px] p-6 sm:p-8 shadow-[0_2px_10px_#00000004]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-indigo-500" />
              </div>
              <h3 className="font-bold text-[18px] text-[#1f2937]">Shipping Address</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-semibold text-gray-600 mb-1.5 block">First Name</label>
                <input className="w-full rounded-[12px] bg-gray-50 text-[#1f2937] px-4 py-3 text-sm border border-gray-100 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all font-medium" placeholder="John" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 mb-1.5 block">Last Name</label>
                <input className="w-full rounded-[12px] bg-gray-50 text-[#1f2937] px-4 py-3 text-sm border border-gray-100 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all font-medium" placeholder="Doe" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-semibold text-gray-600 mb-1.5 block">Address</label>
                <input className="w-full rounded-[12px] bg-gray-50 text-[#1f2937] px-4 py-3 text-sm border border-gray-100 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all font-medium" placeholder="123 Main St" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 mb-1.5 block">City</label>
                <input className="w-full rounded-[12px] bg-gray-50 text-[#1f2937] px-4 py-3 text-sm border border-gray-100 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all font-medium" placeholder="San Francisco" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 mb-1.5 block">ZIP Code</label>
                <input className="w-full rounded-[12px] bg-gray-50 text-[#1f2937] px-4 py-3 text-sm border border-gray-100 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all font-medium" placeholder="94102" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 mb-1.5 block">Phone</label>
                <input className="w-full rounded-[12px] bg-gray-50 text-[#1f2937] px-4 py-3 text-sm border border-gray-100 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all font-medium" placeholder="+1 (555) 123-4567" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 mb-1.5 block">Email</label>
                <input className="w-full rounded-[12px] bg-gray-50 text-[#1f2937] px-4 py-3 text-sm border border-gray-100 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all font-medium" placeholder="john@example.com" />
              </div>
            </div>
          </section>

          {/* Delivery Method */}
          <section className="bg-white border border-gray-100 rounded-[24px] p-6 sm:p-8 shadow-[0_2px_10px_#00000004]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
                <Truck className="w-5 h-5 text-teal-500" />
              </div>
              <h3 className="font-bold text-[18px] text-[#1f2937]">Delivery Method</h3>
            </div>
            <div className="flex flex-col gap-3">
              {deliveryMethods.map((d) => (
                <label
                  key={d.id}
                  className={`flex items-center justify-between p-5 rounded-[16px] border-[2px] cursor-pointer transition-all ${
                    delivery === d.id ? "border-indigo-500 bg-indigo-50/50" : "border-gray-100 hover:border-indigo-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="delivery"
                      value={d.id}
                      checked={delivery === d.id}
                      onChange={() => setDelivery(d.id)}
                      className="accent-indigo-500 w-4 h-4 scale-110"
                    />
                    <div>
                      <p className="text-[15px] font-bold text-[#1f2937]">{d.label}</p>
                      <p className="text-[13px] text-gray-500 font-medium">{d.desc}</p>
                    </div>
                  </div>
                  <span className={`text-[15px] font-extrabold ${d.price === 0 ? "text-teal-500" : "text-[#1f2937]"}`}>
                    {d.price === 0 ? "Free" : `$${d.price.toFixed(2)}`}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Payment */}
          <section className="bg-white border border-gray-100 rounded-[24px] p-6 sm:p-8 shadow-[0_2px_10px_#00000004]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="font-bold text-[18px] text-[#1f2937]">Payment Method</h3>
            </div>
            <div className="flex flex-col gap-3">
              {paymentMethods.map((p) => {
                const Icon = p.icon
                return (
                  <label
                    key={p.id}
                    className={`flex items-center gap-4 p-5 rounded-[16px] border-[2px] cursor-pointer transition-all ${
                      payment === p.id ? "border-indigo-500 bg-indigo-50/50" : "border-gray-100 hover:border-indigo-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={p.id}
                      checked={payment === p.id}
                      onChange={() => setPayment(p.id)}
                      className="accent-indigo-500 w-4 h-4 scale-110"
                    />
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${payment === p.id ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[15px] font-bold text-[#1f2937]">{p.label}</span>
                  </label>
                )
              })}
            </div>

            {payment === "card" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6 pt-6 border-t border-gray-100">
                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-gray-600 mb-1.5 block">Card Number</label>
                  <input className="w-full rounded-[12px] bg-gray-50 text-[#1f2937] px-4 py-3 text-sm border border-gray-100 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all font-medium tracking-wider" placeholder="1234 5678 9012 3456" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-1.5 block">Expiry Date</label>
                  <input className="w-full rounded-[12px] bg-gray-50 text-[#1f2937] px-4 py-3 text-sm border border-gray-100 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all font-medium" placeholder="MM/YY" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-1.5 block">CVV</label>
                  <input className="w-full rounded-[12px] bg-gray-50 text-[#1f2937] px-4 py-3 text-sm border border-gray-100 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all font-medium" placeholder="123" />
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Order summary sticky tray */}
        <div className="w-full lg:w-[380px] shrink-0">
          <div className="bg-white border border-gray-100 rounded-[24px] p-6 sm:p-8 shadow-[0_2px_10px_#00000004] sticky top-24">
            <h3 className="font-bold text-[20px] text-[#1f2937] mb-6">Order Summary</h3>

            <div className="flex flex-col gap-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-[60px] h-[60px] rounded-[12px] bg-gray-50 overflow-hidden shrink-0 border border-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" crossOrigin="anonymous" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <p className="text-[14px] font-bold text-[#1f2937] truncate">{item.name}</p>
                    <p className="text-[12px] font-medium text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-[15px] font-extrabold text-[#4f46e5] block">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="h-px bg-gray-100 mb-6"></div>

            <div className="flex flex-col gap-3 text-[14px] font-medium text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#1f2937] font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className={`font-bold ${deliveryPrice === 0 ? "text-teal-500" : "text-[#1f2937]"}`}>
                  {deliveryPrice === 0 ? "Free" : `$${deliveryPrice.toFixed(2)}`}
                </span>
              </div>
            </div>
            
            <div className="h-px bg-gray-100 mb-6"></div>
            
            <div className="flex justify-between items-end mb-8 block">
              <span className="font-bold text-[16px] text-[#1f2937]">Total</span>
              <span className="font-extrabold text-[28px] text-[#4f46e5] leading-none">${total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => { clearCart(); setPlaced(true) }}
              className="w-full bg-[#1f2937] text-white py-4 rounded-[14px] font-bold hover:bg-[#4f46e5] transition-colors flex items-center gap-2 justify-center shadow-md hover:shadow-lg"
            >
              Pay ${total.toFixed(2)}
              <CheckCircle className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
