"use client"

import { useState, useEffect } from "react"
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

const pieColors = ["#4f46e5", "#0ea5e9", "#14b8a6", "#f43f5e"]

export default function AdminClient() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const [dashboardData, setDashboardData] = useState(null)
  const [usersInfo, setUsersInfo] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashRes, usersRes] = await Promise.all([
          fetch('/api/admin/dashboard'),
          fetch('/api/admin/users')
        ]);
        
        if (dashRes.ok && usersRes.ok) {
           const dashJson = await dashRes.json();
           const usersJson = await usersRes.json();
           setDashboardData(dashJson.dashboardData);
           setUsersInfo(usersJson.users);
        } else {
           window.location.href = '/login';
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !dashboardData) {
     return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
     );
  }

  const stats = [
    { label: "Total Revenue", value: `$${dashboardData.totalRevenue.toLocaleString()}`, icon: DollarSign, change: "+12.5%", up: true },
    { label: "Total Orders", value: dashboardData.totalOrders.toLocaleString(), icon: ShoppingBag, change: "+8.2%", up: true },
    { label: "Total Users", value: dashboardData.totalUsers.toLocaleString(), icon: Users, change: "+15.3%", up: true },
    { label: "Total Products", value: dashboardData.totalProducts.toLocaleString(), icon: Package, change: "-2.1%", up: false },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-100 flex flex-col shrink-0 transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } shadow-[0_0_20px_#00000005]`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center shadow-sm">
              <span className="text-white font-extrabold text-[16px]">N</span>
            </div>
            <span className="font-extrabold text-[18px] text-[#1f2937]">Admin</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false) }}
                className={`flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-bold transition-all w-full ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 shadow-sm"
                    : "text-gray-500 hover:bg-gray-50 hover:text-[#1f2937]"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-indigo-600" : "text-gray-400"}`} />
                {item.label}
                <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${isActive ? "opacity-100 text-indigo-400" : "opacity-0 -translate-x-2"}`} />
              </button>
            )
          })}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-bold text-gray-500 hover:text-[#1f2937] hover:bg-gray-50 transition-colors w-full"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
            Back to Portal
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0 bg-gray-50">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600 hover:bg-gray-100 p-2 rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-[20px] font-extrabold text-[#1f2937] capitalize">{activeTab}</h1>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-9 h-9 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 shadow-sm border-2 border-white"></div>
          </div>
        </header>

        <div className="p-4 lg:p-8 max-w-[1400px] mx-auto">
          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <div className="flex flex-col gap-8">
              {/* Stat cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((s, i) => {
                  const Icon = s.icon
                  return (
                    <div key={i} className="bg-white border border-gray-100 rounded-[20px] p-6 shadow-[0_2px_10px_#00000004]">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-[14px] bg-indigo-50 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-indigo-500" />
                        </div>
                        <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                          s.up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                        }`}>
                          {s.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                          {s.change}
                        </span>
                      </div>
                      <p className="text-[28px] font-extrabold text-[#1f2937] leading-none mb-1">{s.value}</p>
                      <p className="text-sm font-medium text-gray-500">{s.label}</p>
                    </div>
                  )
                })}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue chart */}
                <div className="lg:col-span-2 bg-white border border-gray-100 rounded-[24px] p-6 shadow-[0_2px_10px_#00000004]">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-extrabold text-[18px] text-[#1f2937]">Revenue Overview</h3>
                    <span className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full font-bold">
                      <TrendingUp className="w-3.5 h-3.5" /> +12.5% this month
                    </span>
                  </div>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dashboardData.revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                        <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                        <Tooltip
                          cursor={{ fill: '#f9fafb' }}
                          contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #f3f4f6",
                            borderRadius: "12px",
                            color: "#1f2937",
                            fontWeight: "bold",
                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)"
                          }}
                        />
                        <Bar dataKey="revenue" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Orders pie */}
                <div className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-[0_2px_10px_#00000004]">
                  <h3 className="font-extrabold text-[18px] text-[#1f2937] mb-8">Orders by Status</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={dashboardData.ordersByStatus}
                          cx="50%"
                          cy="50%"
                          innerRadius={65}
                          outerRadius={95}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                        >
                          {dashboardData.ordersByStatus.map((_, i) => (
                            <Cell key={i} fill={pieColors[i]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #f3f4f6",
                            borderRadius: "12px",
                            color: "#1f2937",
                            fontWeight: "bold"
                          }}
                        />
                        <Legend
                          verticalAlign="bottom"
                          height={36}
                          iconType="circle"
                          formatter={(value) => <span className="text-gray-600 font-medium text-[13px] ml-1">{value}</span>}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Recent orders */}
              <div className="bg-white border border-gray-100 rounded-[24px] overflow-hidden shadow-[0_2px_10px_#00000004]">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                   <h3 className="font-extrabold text-[18px] text-[#1f2937]">Recent Orders</h3>
                   <button className="text-[13px] font-bold text-indigo-500 hover:text-indigo-600 transition-colors">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                        <th className="py-4 px-6 font-bold">Order ID</th>
                        <th className="py-4 px-6 font-bold">Date</th>
                        <th className="py-4 px-6 font-bold">Status</th>
                        <th className="py-4 px-6 font-bold">Items</th>
                        <th className="py-4 px-6 text-right font-bold">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-4 px-6 font-bold text-[#1f2937]">{o.id}</td>
                          <td className="py-4 px-6 font-medium text-gray-500">{o.date}</td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                              o.status === "Delivered" ? "bg-emerald-50 text-emerald-600" :
                              o.status === "Shipped" ? "bg-indigo-50 text-indigo-600" :
                              o.status === "Processing" ? "bg-amber-50 text-amber-600" :
                              "bg-red-50 text-red-500"
                            }`}>
                              {o.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 font-medium text-gray-500">{o.items}</td>
                          <td className="py-4 px-6 text-right font-bold text-[#1f2937]">${o.total.toFixed(2)}</td>
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
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-[#1f2937]">Manage Products</h2>
                <button className="bg-indigo-500 text-white px-5 py-2.5 rounded-[12px] text-sm font-bold shadow-sm hover:scale-105 transition-transform flex items-center justify-center gap-2">
                  <Package className="w-4 h-4" />
                  Add Product
                </button>
              </div>
              <div className="bg-white border border-gray-100 rounded-[24px] shadow-[0_2px_10px_#00000004] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                        <th className="py-4 px-6 font-bold">Product</th>
                        <th className="py-4 px-6 font-bold">Category</th>
                        <th className="py-4 px-6 font-bold">Price</th>
                        <th className="py-4 px-6 font-bold">Stock</th>
                        <th className="py-4 px-6 font-bold">Rating</th>
                        <th className="py-4 px-6 text-right font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-3 px-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-[12px] bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-100">
                                <img src={p.image} alt={p.name} className="w-full h-full object-cover" crossOrigin="anonymous" />
                              </div>
                              <span className="font-bold text-[#1f2937] truncate max-w-[200px]">{p.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 font-medium text-gray-500">{p.category}</td>
                          <td className="py-4 px-6 font-bold text-[#1f2937]">${p.price.toFixed(2)}</td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex px-2 py-0.5 rounded-[6px] text-[12px] font-bold ${
                              p.stock > 50 ? "bg-emerald-50 text-emerald-600" : 
                              p.stock > 10 ? "bg-orange-50 text-orange-600" : "bg-red-50 text-red-500"
                            }`}>
                              {p.stock} units
                            </span>
                          </td>
                          <td className="py-4 px-6 font-medium text-gray-800">{p.rating} ⭐</td>
                          <td className="py-4 px-6 text-right">
                            <button className="text-[13px] font-bold text-indigo-500 hover:text-indigo-600 mr-4 transition-colors">Edit</button>
                            <button className="text-[13px] font-bold text-red-500 hover:text-red-600 transition-colors">Delete</button>
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
            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-extrabold text-[#1f2937]">User Management</h2>
              <div className="bg-white border border-gray-100 rounded-[24px] shadow-[0_2px_10px_#00000004] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                        <th className="py-4 px-6 font-bold">Name</th>
                        <th className="py-4 px-6 font-bold">Email</th>
                        <th className="py-4 px-6 font-bold">Orders</th>
                        <th className="py-4 px-6 font-bold">Spent</th>
                        <th className="py-4 px-6 font-bold">Status</th>
                        <th className="py-4 px-6 text-right font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {usersInfo.map((u) => (
                        <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-4 px-6 font-bold text-[#1f2937]">{u.name}</td>
                          <td className="py-4 px-6 font-medium text-gray-500">{u.email}</td>
                          <td className="py-4 px-6 font-extrabold text-[#1f2937]">{u.orders}</td>
                          <td className="py-4 px-6 font-extrabold text-[#1f2937]">${u.spent.toFixed(2)}</td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                              u.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500"
                            }`}>
                              {u.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button className="text-[13px] font-bold text-indigo-500 hover:text-indigo-600 mr-4 transition-colors">Edit</button>
                            <button className="text-[13px] font-bold text-gray-400 hover:text-red-500 transition-colors">Ban</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Placeholders for Sellers, Orders if needed */}
          {(activeTab === "orders" || activeTab === "sellers") && (
            <div className="h-[400px] flex flex-col items-center justify-center text-center bg-white rounded-[24px] border border-dashed border-gray-200">
                <Store className="w-12 h-12 text-gray-300 mb-4" />
               <p className="text-gray-500 font-bold text-[18px]">This directory is currently pending migration.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
