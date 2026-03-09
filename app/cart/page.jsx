'use client';

import Link from 'next/link';
import { ShoppingCart, ArrowRight } from 'lucide-react';

export default function CartPage() {
  return (
    <main className="min-h-screen bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Shopping Cart</h1>
          <p className="text-gray-600">Your cart is currently empty</p>
        </div>

        {/* Empty Cart */}
        <div className="flex flex-col items-center justify-center py-20 animate-scale-in">
          <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-6">
            <ShoppingCart className="w-10 h-10 text-primary" />
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-2 text-balance">
            Your cart is empty
          </h2>
          <p className="text-gray-600 text-center max-w-md mb-8">
            Start shopping to add items to your cart. We have amazing products waiting for you!
          </p>

          <Link
            href="/"
            className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-blue-700 transition-smooth hover-lift flex items-center gap-2"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 pt-12 border-t border-gray-200">
          <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-smooth">
            <div className="inline-block w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
              <span className="text-2xl">🚚</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Free Shipping</h3>
            <p className="text-gray-600 text-sm">
              Free shipping on orders over $50. Fast and reliable delivery.
            </p>
          </div>

          <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-smooth">
            <div className="inline-block w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-3">
              <span className="text-2xl">🔄</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Easy Returns</h3>
            <p className="text-gray-600 text-sm">
              Not satisfied? 30-day money-back guarantee with easy returns.
            </p>
          </div>

          <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-smooth">
            <div className="inline-block w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Secure Payment</h3>
            <p className="text-gray-600 text-sm">
              Your payment information is safe with our secure checkout.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
