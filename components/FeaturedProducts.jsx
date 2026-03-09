'use client';

import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/products.json')
      .then(res => res.json())
      .then(data => {
        const featured = data.products.filter(p => p.featured);
        setProducts(featured);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading products:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-lg h-72 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <section id="products" className="py-10 sm:py-12">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 text-balance">
          Featured Products
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Discover our best-selling and most popular items
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 animate-fade-in">
        {products.map((product, index) => (
          <div
            key={product.id}
            style={{
              animation: `slideIn 0.6s ease-out ${index * 0.1}s both`
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
