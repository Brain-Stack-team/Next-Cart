'use client';

import Link from 'next/link';
import { ShoppingCart, ArrowRight, Trash2, Plus, Minus, PackageOpen } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function CartPage() {
  const { items, subtotal, removeItem, updateQuantity } = useCart();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <main className="min-h-[80vh] bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-[32px] font-extrabold text-[#1f2937] tracking-tight">Your Cart</h1>
          <p className="text-gray-500 font-medium">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your bag
          </p>
        </div>

        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="w-full bg-white rounded-[24px] border border-gray-100 flex flex-col items-center justify-center py-20 px-4 shadow-[0_2px_10px_#00000004]">
            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
              <PackageOpen className="w-12 h-12 text-indigo-500" />
            </div>
            <h2 className="text-[24px] font-bold text-[#1f2937] mb-2 text-center">Your bag is completely empty</h2>
            <p className="text-gray-400 text-center max-w-md mb-8">
              Looks like you haven't added anything to your cart yet. Let's get you back to the shop to find something brilliant!
            </p>
            <Link
              href="/products"
              className="px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-sky-400 text-white rounded-[12px] font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-sm"
            >
              Start Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          /* Populated Cart Layout */
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Cart Items List */}
            <div className="flex-1 w-full bg-white border border-gray-100 rounded-[24px] p-6 shadow-[0_2px_10px_#00000004]">
              <div className="flex flex-col gap-6">
                {items.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-6 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="w-full sm:w-[120px] aspect-square rounded-[16px] bg-gray-50 overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-4">
                        <div className="flex flex-col gap-1 pr-6">
                          <h3 className="font-bold text-[18px] text-[#1f2937] leading-tight">{item.name}</h3>
                          <p className="text-[14px] text-gray-500">{item.category}</p>
                        </div>
                        <span className="font-extrabold text-[20px] text-[#4f46e5]">${item.price.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Incrementor */}
                        <div className="flex items-center gap-4 bg-gray-50 px-3 py-2 rounded-[12px] border border-gray-100">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-[8px] transition-colors text-gray-600 hover:text-indigo-500"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-6 text-center font-bold text-[14px] text-[#1f2937]">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-[8px] transition-colors text-gray-600 hover:text-indigo-500"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Remove Action */}
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="flex items-center justify-center p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-[10px] transition-colors"
                        >
                          <Trash2 className="w-5 h-5 mx-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky Order Summary Box */}
            <aside className="w-full lg:w-[380px] shrink-0">
              <div className="bg-white border text-center border-gray-100 rounded-[24px] p-8 shadow-[0_2px_10px_#00000004] sticky top-24">
                <h2 className="text-[20px] font-bold text-[#1f2937] text-left mb-6">Order Summary</h2>
                
                <div className="flex flex-col gap-4 text-[15px] font-medium text-gray-600">
                  <div className="flex justify-between items-center">
                    <span>Subtotal</span>
                    <span className="text-[#1f2937] font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Estimated Tax (8%)</span>
                    <span className="text-[#1f2937] font-bold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Shipping</span>
                    <span className="text-teal-500 font-bold">Free</span>
                  </div>
                </div>

                <div className="h-px w-full bg-gray-100 my-6"></div>
                
                <div className="flex justify-between items-end mb-8">
                  <span className="text-[16px] font-bold text-[#1f2937]">Total</span>
                  <span className="text-[28px] font-extrabold text-[#4f46e5] leading-none">${total.toFixed(2)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="w-full py-4 bg-[#1f2937] text-white rounded-[14px] font-bold hover:bg-[#4f46e5] transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  Secure Checkout
                  <ShoppingCart className="w-5 h-5" />
                </Link>
                <div className="flex items-center justify-center gap-2 mt-4 text-[12px] font-medium text-gray-400">
                  <ShieldCheckIcon />
                  100% secure encrypted transaction
                </div>
              </div>
            </aside>
            
          </div>
        )}
      </div>
    </main>
  );
}

function ShieldCheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
}
