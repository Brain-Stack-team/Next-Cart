'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Heart, Menu, X } from 'lucide-react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Load products
    fetch('/data/products.json')
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(err => console.error('Error loading products:', err));
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);
    if (value.trim()) {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.category.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredResults(results.slice(0, 5));
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="hidden sm:inline font-bold text-xl text-foreground">Next Cart</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 mx-8 relative">
            <div className="relative w-3xl">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 rounded-full border border-gray-300 focus:outline-none focus:border-primary focus:bg-white transition-smooth"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

              {/* Search Results Dropdown */}
              {showResults && filteredResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {filteredResults.map(product => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      className="block px-4 py-3 hover:bg-gray-50 border-b last:border-b-0 transition-smooth"
                      onClick={() => {
                        setSearchQuery('');
                        setShowResults(false);
                      }}
                    >
                      <p className="text-sm font-medium text-foreground">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-6">
            {/* Search Icon Mobile */}
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-smooth">
              <Search className="w-5 h-5 text-foreground" />
            </button>

            {/* Wishlist */}
            <button className="p-2 hover:bg-gray-100 rounded-full transition-smooth hover-lift">
              <Heart className="w-5 h-5 text-foreground" />
            </button>

            {/* Cart */}
            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-smooth hover-lift relative">
              <ShoppingCart className="w-5 h-5 text-foreground" />
              <span className="absolute top-0 right-0 w-5 h-5 bg-primary text-white rounded-full text-xs flex items-center justify-center font-bold">
                0
              </span>
            </Link>

            {/* Login Button */}
            <Link
              href="/login"
              className="hidden sm:block px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold transition-smooth hover-lift hover:shadow-lg active:scale-95"
            >
              Login
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-smooth"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-slide-in">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 rounded-full border border-gray-300 focus:outline-none focus:border-primary"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <Link
              href="/login"
              className="block w-full px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-medium text-center transition-smooth hover-lift text-sm"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
