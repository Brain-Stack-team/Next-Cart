'use client';

import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import BannerSlider from '@/components/BannerSlider';
import Categories from '@/components/Categories';
import FeaturedProducts from '@/components/FeaturedProducts';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/products.json')
      .then(res => res.json())
      .then(data => {
        setAllProducts(data.products);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading products:', err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="bg-white">
      <Toaster position="top-right" richColors />
      
      {/* Banner Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <BannerSlider />
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <Categories />
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <FeaturedProducts />
      </section>

      {/* All Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 text-balance">
            All Products
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Explore our complete collection of premium products
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-72 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 animate-fade-in">
            {allProducts.map((product, index) => (
              <div
                key={product.id}
                style={{
                  animation: `slideIn 0.6s ease-out ${index * 0.08}s both`
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-primary via-blue-600 to-secondary py-10 sm:py-12 mt-8 sm:mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-in">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 text-balance">
            Stay Updated
          </h2>
          <p className="text-white/90 text-sm sm:text-base mb-6 text-pretty">
            Subscribe to our newsletter and get exclusive deals, new arrivals, and special offers
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-white text-sm"
            />
            <button className="px-6 sm:px-8 py-2.5 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition-smooth hover-lift text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
