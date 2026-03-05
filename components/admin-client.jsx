"use client"

import { useState } from "react"
import Link from "next/link"
import {
  LayoutDashboard, Package, Users, Store, ShoppingBag, DollarSign,
  ChevronRight, ArrowUpRight, ArrowDownRight, TrendingUp, Menu, X, ArrowLeft
} from "lucide-react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts"
import { adminStats, products, orders } from "@/lib/data"

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "users", label: "Users", icon: Users },
  { id: "sellers", label: "Sellers", icon: Store },
]

const pieColors = ["var(--chart-3)", "var(--primary)", "var(--accent)", "var(--destructive)"]

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", orders: 12, spent: 1245.99, status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", orders: 8, spent: 892.50, status: "Active" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", orders: 3, spent: 245.00, status: "Inactive" },
  { id: 4, name: "Sarah Williams", email: "sarah@example.com", orders: 15, spent: 2100.75, status: "Active" },
  { id: 5, name: "Tom Brown", email: "tom@example.com", orders: 1, spent: 89.99, status: "Active" },
]

export default function AdminClient() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const stats = [
    { label: "Total Revenue", value: `$${adminStats.totalRevenue.toLocaleString()}`, icon: DollarSign, change: "+12.5%", up: true },
    { label: "Total Orders", value: adminStats.totalOrders.toLocaleString(), icon: ShoppingBag, change: "+8.2%", up: true },
    { label: "Total Users", value: adminStats.totalUsers.toLocaleString(), icon: Users, change: "+15.3%", up: true },
    { label: "Total Products", value: adminStats.totalProducts.toLocaleString(), icon: Package, change: "-2.1%", up: false },
  ]

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-card border-r border-border flex flex-col shrink-0 transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">N</span>
            </div>
            <span className="font-bold text-card-foreground">Admin</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-muted-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false) }}
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
        </nav>
        <div className="p-3 border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-card-foreground hover:bg-secondary transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Store
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border px-4 lg:px-6 py-3 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-foreground capitalize">{activeTab}</h1>
        </header>

        <div className="p-4 lg:p-6">
          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <div className="flex flex-col gap-6">
              {/* Stat cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {stats.map((s, i) => {
                  const Icon = s.icon
                  return (
                    <div key={i} className="bg-card border border-border rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className={`flex items-center gap-1 text-xs font-medium ${
                          s.up ? "text-chart-3" : "text-destructive"
                        }`}>
                          {s.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                          {s.change}
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-card-foreground">{s.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                    </div>
                  )
                })}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Revenue chart */}
                <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-semibold text-card-foreground">Revenue Overview</h3>
                    <span className="flex items-center gap-1 text-xs text-chart-3 font-medium">
                      <TrendingUp className="w-3.5 h-3.5" /> +12.5% this month
                    </span>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={adminStats.revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                        <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--card)",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                            color: "var(--card-foreground)"
                          }}
                        />
                        <Bar dataKey="revenue" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Orders pie */}
                <div className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-semibold text-card-foreground mb-5">Orders by Status</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={adminStats.ordersByStatus}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {adminStats.ordersByStatus.map((_, i) => (
                            <Cell key={i} fill={pieColors[i]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--card)",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                            color: "var(--card-foreground)"
                          }}
                        />
                        <Legend
                          formatter={(value) => <span style={{ color: "var(--card-foreground)", fontSize: 12 }}>{value}</span>}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Recent orders */}
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-semibold text-card-foreground mb-5">Recent Orders</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left text-muted-foreground font-medium py-3 px-3">Order ID</th>
                        <th className="text-left text-muted-foreground font-medium py-3 px-3">Date</th>
                        <th className="text-left text-muted-foreground font-medium py-3 px-3">Status</th>
                        <th className="text-left text-muted-foreground font-medium py-3 px-3">Items</th>
                        <th className="text-right text-muted-foreground font-medium py-3 px-3">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => (
                        <tr key={o.id} className="border-b border-border last:border-0">
                          <td className="py-3 px-3 font-medium text-card-foreground">{o.id}</td>
                          <td className="py-3 px-3 text-muted-foreground">{o.date}</td>
                          <td className="py-3 px-3">
                            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                              o.status === "Delivered" ? "bg-chart-3/10 text-chart-3" :
                              o.status === "Shipped" ? "bg-primary/10 text-primary" :
                              o.status === "Processing" ? "bg-accent/10 text-accent" :
                              "bg-destructive/10 text-destructive"
                            }`}>
                              {o.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-muted-foreground">{o.items}</td>
                          <td className="py-3 px-3 text-right font-medium text-card-foreground">${o.total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Products management */}
          {activeTab === "products" && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold text-foreground">Manage Products</h2>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
                  Add Product
                </button>
              </div>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-secondary/50">
                        <th className="text-left text-muted-foreground font-medium py-3 px-4">Product</th>
                        <th className="text-left text-muted-foreground font-medium py-3 px-4">Category</th>
                        <th className="text-left text-muted-foreground font-medium py-3 px-4">Price</th>
                        <th className="text-left text-muted-foreground font-medium py-3 px-4">Stock</th>
                        <th className="text-left text-muted-foreground font-medium py-3 px-4">Rating</th>
                        <th className="text-right text-muted-foreground font-medium py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" crossOrigin="anonymous" />
                              <span className="font-medium text-card-foreground truncate max-w-[200px]">{p.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">{p.category}</td>
                          <td className="py-3 px-4 text-card-foreground font-medium">${p.price.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <span className={`text-sm font-medium ${p.stock > 50 ? "text-chart-3" : p.stock > 10 ? "text-accent" : "text-destructive"}`}>
                              {p.stock}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-card-foreground">{p.rating}</td>
                          <td className="py-3 px-4 text-right">
                            <button className="text-primary hover:underline text-sm mr-3">Edit</button>
                            <button className="text-destructive hover:underline text-sm">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Orders management */}
          {activeTab === "orders" && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-5">Order Management</h2>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-secondary/50">
                        <th className="text-left text-muted-foreground font-medium py-3 px-4">Order ID</th>
                        <th className="text-left text-muted-foreground font-medium py-3 px-4">Date</th>
                        <th className="text-left text-muted-foreground font-medium py-3 px-4">Items</th>
                        <th className="text-left text-muted-foreground font-medium py-3 px-4">Status</th>
                        <th className="text-right text-muted-foreground font-medium py-3 px-4">Total</th>
                        <th className="text-right text-muted-foreground font-medium py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => (
                        <tr key={o.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition">
                          <td className="py-3 px-4 font-medium text-card-foreground">{o.id}</td>
                          <td className="py-3 px-4 text-muted-foreground">{o.date}</td>
                          <td className="py-3 px-4 text-muted-foreground">{o.items}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${
                              o.status === "Delivered" ? "bg-chart-3/10 text-chart-3" :
                              o.status === "Shipped" ? "bg-primary/10 text-primary" :
                              o.status === "Processing" ? "bg-accent/10 text-accent" :
                              "bg-destructive/10 text-destructive"
                            }`}>
                              {o.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right font-medium text-card-foreground">${o.total.toFixed(2)}</td>
                          <td className="py-3 px-4 text-right">
                            <button className="text-primary hover:underline text-sm">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Users management */}
          {activeTab === "users" && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-5">User Management</h2>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-secondary/50">
                        <th className="text-left text-muted-foreground font-medium py-3 px-4">Name</th>
                        <th className="text-left text-muted-foreground font-medium py-3 px-4">Email</th>
                        <th className="text-left text-muted-foreground font-medium py-3 px-4">Orders</th>
                        <th className="text-left text-muted-foreground font-medium py-3 px-4">Spent</th>
                        <th className="text-left text-muted-foreground font-medium py-3 px-4">Status</th>
                        <th className="text-right text-muted-foreground font-medium py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockUsers.map((u) => (
                        <tr key={u.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition">
                          <td className="py-3 px-4 font-medium text-card-foreground">{u.name}</td>
                          <td className="py-3 px-4 text-muted-foreground">{u.email}</td>
                          <td className="py-3 px-4 text-card-foreground">{u.orders}</td>
                          <td className="py-3 px-4 text-card-foreground font-medium">${u.spent.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${
                              u.status === "Active" ? "bg-chart-3/10 text-chart-3" : "bg-muted text-muted-foreground"
                            }`}>
                              {u.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button className="text-primary hover:underline text-sm mr-3">Edit</button>
                            <button className="text-destructive hover:underline text-sm">Ban</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Sellers management */}
          {activeTab === "sellers" && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-5">Seller Management</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {[
                  { name: "TechZone Official", products: 256, revenue: "$45,200", status: "Verified" },
                  { name: "FitTech Store", products: 189, revenue: "$32,100", status: "Verified" },
                  { name: "UrbanEdge Fashion", products: 342, revenue: "$28,750", status: "Pending" },
                  { name: "NaturGlow Official", products: 128, revenue: "$18,900", status: "Verified" },
                  { name: "CraftHouse Living", products: 95, revenue: "$12,400", status: "Pending" },
                  { name: "SprintX Athletics", products: 201, revenue: "$38,600", status: "Verified" },
                ].map((s, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-card-foreground">{s.name}</h4>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        s.status === "Verified" ? "bg-chart-3/10 text-chart-3" : "bg-accent/10 text-accent"
                      }`}>
                        {s.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{s.products} products</span>
                      <span className="font-medium text-card-foreground">{s.revenue}</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 bg-secondary text-secondary-foreground py-2 rounded-lg text-xs font-medium hover:bg-secondary/80 transition">
                        View Details
                      </button>
                      <button className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg text-xs font-medium hover:opacity-90 transition">
                        Contact
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
