"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Heart, User, MapPin, Package, ChevronRight, LogOut, Truck
} from "lucide-react"

const sidebarItems = [
  { id: "orders", label: "My Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "profile", label: "Profile Settings", icon: User },
  { id: "addresses", label: "Addresses", icon: MapPin },
]

// Mocked exactly as described in the user's mockup
const orders = [
  {
    id: "ORD-2024-001",
    status: "Delivered",
    date: "Placed on February 15, 2024",
    price: 299.98,
    tracking: "TRK123456789",
  },
  {
    id: "ORD-2024-002",
    status: "Shipped",
    date: "Placed on February 18, 2024",
    price: 149.99,
    tracking: "TRK987654321",
  },
  {
    id: "ORD-2024-003",
    status: "Processing",
    date: "Placed on February 20, 2024",
    price: 89.99,
    tracking: "Pending",
  }
]

const STAGES = ["Pending", "Processing", "Shipped", "Delivered"];

const OrderProgress = ({ currentStatus }) => {
  const currentIndex = STAGES.indexOf(currentStatus);

  return (
    <div className="w-full flex items-center justify-between relative mt-6 mb-8 px-4 sm:px-12">
      {/* Background track line */}
      <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-0.5 bg-gray-200 z-0"></div>
      
      {/* Filled track line overlaying */}
      {currentIndex > 0 && (
        <div 
          className="absolute left-[10%] top-1/2 -translate-y-1/2 h-0.5 bg-[#4f46e5] z-0 transition-all duration-500"
          style={{ width: `${(currentIndex / 3) * 80}%` }}
        ></div>
      )}

      {STAGES.map((stage, idx) => {
        const isActive = idx <= currentIndex;
        return (
          <div key={stage} className="relative z-10 flex flex-col items-center gap-3">
            {isActive ? (
              <div className="w-[34px] h-[34px] bg-white rounded-full flex items-center justify-center p-1 relative">
                <div className="w-full h-full bg-[#4f46e5] rounded-full flex items-center justify-center shadow-sm">
                  <Package className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            ) : (
              <div className="w-[34px] h-[34px] flex items-center justify-center">
                <div className="w-[8px] h-[8px] bg-gray-300 rounded-full"></div>
              </div>
            )}
            <span className={`text-[11px] font-bold ${isActive ? 'text-gray-700' : 'text-gray-400'}`}>
              {stage}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default function DashboardClient() {
  const [activeTab, setActiveTab] = useState("orders")

  return (
    <div className="max-w-[1240px] mx-auto px-4 py-8 sm:py-12 bg-white min-h-[80vh]">
      <h1 className="text-2xl font-bold text-[#1f2937] mb-8">My Account</h1>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
        
        {/* Left Sidebar Layout */}
        <aside className="w-full lg:w-[280px] shrink-0">
          <div className="bg-white border text-center border-gray-100 rounded-[20px] p-6 shadow-[0_2px_10px_#00000004] mb-6">
            <div className="w-[80px] h-[80px] mx-auto rounded-full bg-[#3b82f6] text-white flex items-center justify-center text-[28px] font-bold mb-4 shadow-sm">
              JD
            </div>
            <h2 className="text-[18px] font-bold text-[#1f2937] mb-1">John Doe</h2>
            <p className="text-[13px] text-gray-500 font-medium">john@example.com</p>
          </div>

          <nav className="flex flex-col gap-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-5 py-3.5 rounded-[12px] text-[14px] font-semibold transition-all w-full group ${
                    isActive
                      ? "bg-gradient-to-r from-[#4f46e5] to-[#3b82f6] text-white shadow-sm"
                      : "bg-white text-gray-600 hover:bg-gray-50 hover:text-[#1f2937]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600"}`} />
                  {item.label}
                  <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${isActive ? "text-white/80" : "text-gray-300 group-hover:translate-x-1"}`} />
                </button>
              )
            })}
            <div className="h-px bg-gray-100 my-2 mx-4"></div>
            <button className="flex items-center gap-3 px-5 py-3.5 rounded-[12px] text-[14px] font-bold text-[#ef4444] hover:bg-red-50 transition-colors w-full group">
              <LogOut className="w-4 h-4 text-[#ef4444]/80" />
              Logout
            </button>
          </nav>
        </aside>

        {/* Right Content Area */}
        <div className="flex-1 w-full min-w-0">
          
          {activeTab === "orders" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[20px] font-bold text-[#1f2937]">My Orders</h2>
                <span className="text-[13px] text-gray-400 font-medium">{orders.length} orders</span>
              </div>
              
              <div className="flex flex-col gap-6">
                {orders.map((order) => {
                  let badgeColors = "bg-gray-100 text-gray-600";
                  if (order.status === "Delivered") badgeColors = "bg-emerald-50 text-emerald-600";
                  else if (order.status === "Shipped") badgeColors = "bg-[#eff6ff] text-[#3b82f6]";
                  else if (order.status === "Processing") badgeColors = "bg-[#fef3c7] text-[#d97706]";

                  return (
                    <div key={order.id} className="bg-white border border-gray-100 rounded-[20px] p-6 shadow-[0_2px_10px_#00000004]">
                      {/* Top Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-3">
                            <h3 className="font-bold text-[16px] text-[#1f2937]">{order.id}</h3>
                            <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full ${badgeColors}`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-[13px] text-gray-500 font-medium">{order.date}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 ">
                          <span className="text-[22px] font-extrabold text-[#4f46e5] leading-none">${order.price.toFixed(2)}</span>
                          <span className="text-[12px] text-gray-400 font-medium">Tracking: {order.tracking}</span>
                        </div>
                      </div>

                      {/* Middle Progress Timeline */}
                      <div className="py-2 border-y border-gray-100">
                         <OrderProgress currentStatus={order.status} />
                      </div>

                      {/* Footer Actions */}
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 w-full">
                        <button className="w-full sm:flex-1 py-2.5 border border-gray-200 text-gray-600 text-[13px] font-bold rounded-[10px] hover:bg-gray-50 hover:text-gray-800 transition-colors">
                          View Details
                        </button>
                        {order.status === "Delivered" ? (
                          <button className="w-full sm:flex-1 py-2.5 bg-[#4f46e5] text-white text-[13px] font-bold rounded-[10px] hover:bg-indigo-600 transition-colors shadow-sm">
                            Leave Review
                          </button>
                        ) : null}
                        <button className="w-full sm:flex-1 py-2.5 border border-gray-200 text-gray-600 text-[13px] font-bold rounded-[10px] flex items-center justify-center gap-2 hover:bg-gray-50 hover:text-gray-800 transition-colors">
                          <Truck className="w-4 h-4" />
                          Track Order
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Placeholders for other tabs for completeness */}
          {activeTab !== "orders" && (
            <div className="h-[400px] flex flex-col items-center justify-center text-center bg-gray-50 rounded-[20px] border border-dashed border-gray-200">
               <p className="text-gray-500 font-medium">This section is currently under construction.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
