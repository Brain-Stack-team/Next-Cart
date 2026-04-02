'use client';

import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import BannerSlider from '@/components/BannerSlider';
import Categories from '@/components/Categories';
import TrendingProducts from '@/components/trending-products';
import RecommendedProducts from '@/components/recommended-products';
import SubscribeSection from '@/components/SubscribeSection';
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

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <TrendingProducts />
      </section>

      {/* Recommended for You */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <RecommendedProducts />
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

      {/* Subscribe Section */}
      <SubscribeSection />
    </main>
  );
}
