"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ShoppingBag, Heart, User, MapPin, Package, ChevronRight, LogOut,
  Clock, CheckCircle, Truck as TruckIcon, XCircle, ArrowLeft
} from "lucide-react"
import { orders, products } from "@/lib/data"

const sidebarItems = [
  { id: "orders", label: "My Orders", icon: ShoppingBag },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "profile", label: "Profile Settings", icon: User },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "tracking", label: "Order Tracking", icon: Package },
]

const statusIcons = {
  Processing: Clock,
  Shipped: TruckIcon,
  Delivered: CheckCircle,
  Cancelled: XCircle,
}

const statusColors = {
  Processing: "text-accent bg-accent/10",
  Shipped: "text-primary bg-primary/10",
  Delivered: "text-chart-3 bg-chart-3/10",
  Cancelled: "text-destructive bg-destructive/10",
}

export default function DashboardClient() {
  const [activeTab, setActiveTab] = useState("orders")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const wishlistProducts = products.slice(0, 4)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/" className="text-muted-foreground hover:text-foreground transition">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-foreground">My Account</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile tab bar */}
        <div className="lg:hidden flex gap-2 overflow-x-auto pb-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition ${
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            )
          })}
        </div>

        {/* Sidebar - desktop */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="bg-card border border-border rounded-xl p-4 sticky top-24">
            {/* User info */}
            <div className="flex items-center gap-3 mb-5 px-2">
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm text-card-foreground">John Doe</p>
                <p className="text-xs text-muted-foreground">john@example.com</p>
              </div>
            </div>

            <nav className="flex flex-col gap-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition text-left w-full ${
                      activeTab === item.id
                        ? "bg-primary text-primary-foreground"
                        : "text-card-foreground hover:bg-secondary"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                    <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-50" />
                  </button>
                )
              })}
              <hr className="border-border my-2" />
              <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/5 transition text-left w-full">
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Orders */}
          {activeTab === "orders" && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-5">My Orders</h2>
              <div className="flex flex-col gap-4">
                {orders.map((order) => {
                  const StatusIcon = statusIcons[order.status]
                  return (
                    <div key={order.id} className="bg-card border border-border rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-medium text-card-foreground">{order.id}</p>
                          <p className="text-xs text-muted-foreground">{order.date}</p>
                        </div>
                        <span className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${statusColors[order.status]}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{order.items} item{order.items > 1 ? "s" : ""}</span>
                        <span className="font-semibold text-card-foreground">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Wishlist */}
          {activeTab === "wishlist" && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-5">My Wishlist</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wishlistProducts.map((p) => (
                  <div key={p.id} className="bg-card border border-border rounded-xl p-4 flex gap-4">
                    <img src={p.image} alt={p.name} className="w-20 h-20 rounded-lg object-cover" crossOrigin="anonymous" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-card-foreground truncate">{p.name}</h4>
                      <p className="text-lg font-bold text-card-foreground mt-1">${p.price.toFixed(2)}</p>
                      <Link href={`/products/${p.slug}`} className="text-xs text-primary mt-1 inline-block hover:underline">
                        View Product
                      </Link>
                    </div>
                    <button className="self-start text-muted-foreground hover:text-destructive transition">
                      <Heart className="w-5 h-5 fill-current" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile */}
          {activeTab === "profile" && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-5">Profile Settings</h2>
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">First Name</label>
                    <input defaultValue="John" className="w-full rounded-lg bg-secondary text-secondary-foreground px-3 py-2.5 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Last Name</label>
                    <input defaultValue="Doe" className="w-full rounded-lg bg-secondary text-secondary-foreground px-3 py-2.5 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Email</label>
                    <input defaultValue="john@example.com" className="w-full rounded-lg bg-secondary text-secondary-foreground px-3 py-2.5 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Phone</label>
                    <input defaultValue="+1 (555) 123-4567" className="w-full rounded-lg bg-secondary text-secondary-foreground px-3 py-2.5 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                </div>
                <button className="mt-6 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Addresses */}
          {activeTab === "addresses" && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-5">My Addresses</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-card border border-primary rounded-xl p-5 relative">
                  <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">Default</span>
                  <p className="font-medium text-card-foreground">Home</p>
                  <p className="text-sm text-muted-foreground mt-1">123 Main Street, Apt 4B</p>
                  <p className="text-sm text-muted-foreground">San Francisco, CA 94102</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-5">
                  <p className="font-medium text-card-foreground">Office</p>
                  <p className="text-sm text-muted-foreground mt-1">456 Tech Blvd, Suite 200</p>
                  <p className="text-sm text-muted-foreground">San Francisco, CA 94105</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 987-6543</p>
                </div>
                <button className="border-2 border-dashed border-border rounded-xl p-5 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary/30 hover:text-primary transition">
                  <MapPin className="w-6 h-6" />
                  <span className="text-sm font-medium">Add New Address</span>
                </button>
              </div>
            </div>
          )}

          {/* Order tracking */}
          {activeTab === "tracking" && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-5">Order Tracking</h2>
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="font-medium text-card-foreground">ORD-2024002</p>
                    <p className="text-sm text-muted-foreground">Estimated delivery: Feb 25, 2026</p>
                  </div>
                  <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full">Shipped</span>
                </div>

                {/* Timeline */}
                <div className="flex flex-col gap-0">
                  {[
                    { step: "Order Placed", date: "Feb 18, 2026", done: true },
                    { step: "Payment Confirmed", date: "Feb 18, 2026", done: true },
                    { step: "Shipped", date: "Feb 19, 2026", done: true },
                    { step: "Out for Delivery", date: "Pending", done: false },
                    { step: "Delivered", date: "Pending", done: false },
                  ].map((item, i, arr) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full border-2 ${item.done ? "bg-primary border-primary" : "border-border bg-card"}`} />
                        {i < arr.length - 1 && (
                          <div className={`w-0.5 h-10 ${item.done ? "bg-primary" : "bg-border"}`} />
                        )}
                      </div>
                      <div className="pb-8">
                        <p className={`text-sm font-medium ${item.done ? "text-card-foreground" : "text-muted-foreground"}`}>{item.step}</p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
