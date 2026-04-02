"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, Heart, Menu, User, LayoutDashboard } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function Header() {
  const router = useRouter();
  const { items } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/user/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        // Silently ignore if not logged in
      }
    };
    fetchUser();
  }, []);

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="w-full bg-white flex flex-col font-sans">
      {/* Top Banner */}
      <div className="w-full bg-gradient-to-r from-indigo-500 via-sky-400 to-teal-400 py-2 text-center text-white text-sm font-medium flex justify-center items-center gap-2">
        <span>🎉</span>
        <span>Free shipping on orders over $50 | Summer Sale: Up to 50% Off!</span>
      </div>

      {/* Main Navbar */}
      <div className="w-full border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4 md:gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                <ShoppingCart className="text-white w-4 h-4" />
              </div>
              <span className="font-bold text-xl text-teal-500">Next-Cart</span>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl relative items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands and more..."
                className="w-full pl-4 pr-12 py-2.5 bg-gray-50 rounded-lg border border-gray-100 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all text-sm"
              />
              <button type="submit" className="absolute right-1 text-white bg-indigo-500 hover:bg-indigo-600 rounded-md p-1.5 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-5 flex-shrink-0">
              {/* Wishlist */}
              <Link href="/favorites" className="text-gray-600 hover:text-indigo-500 transition-colors">
                <Heart className="w-5 h-5" />
              </Link>
              
              {/* Cart */}
              <Link href="/cart" className="text-gray-600 hover:text-indigo-500 transition-colors relative block">
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* Account / Login */}
              {user ? (
                <div className="flex items-center gap-3">
                  {user.role === 'admin' && (
                    <Link href="/admin" title="Admin Dashboard" className="text-gray-600 hover:text-indigo-500 transition-colors">
                      <LayoutDashboard className="w-5 h-5" />
                    </Link>
                  )}
                  <Link href="/account" className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-sky-400 text-white px-4 py-2 rounded-md font-medium text-sm transition-transform hover:scale-105 active:scale-95 shadow-sm">
                    <User className="w-4 h-4" />
                    {user.name.split(' ')[0]}
                  </Link>
                </div>
              ) : (
                <Link href="/login" className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium text-sm transition-colors">
                   <User className="w-4 h-4" />
                   Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="w-full border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14 gap-8 overflow-x-auto whitespace-nowrap hide-scrollbar">
            {/* All Categories */}
            <Link href="/products" className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-semibold transition-colors flex-shrink-0">
              <Menu className="w-4 h-4" />
              All Categories
            </Link>

            {/* Navigation Links */}
            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link href="/flash-sale" className="text-orange-500 hover:text-orange-600 transition-colors hover:underline underline-offset-4">
                Flash Sale
              </Link>
              <Link href="/products?tag=trending" className="text-gray-600 hover:text-indigo-500 transition-colors hover:underline underline-offset-4">
                Trending
              </Link>
              <Link href="/products?tag=new-arrivals" className="text-gray-600 hover:text-indigo-500 transition-colors hover:underline underline-offset-4">
                New Arrivals
              </Link>
              <Link href="/products?tag=deals" className="text-gray-600 hover:text-indigo-500 transition-colors hover:underline underline-offset-4">
                Best Deals
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
