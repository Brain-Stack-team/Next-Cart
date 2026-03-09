'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`✓ ${product.name} added to cart!`, {
        duration: 3000,
        position: 'bottom-right',
      });
    }, 300);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(
      !isFavorite ? `♥ Added to wishlist!` : `Removed from wishlist`,
      {
        duration: 2000,
        position: 'bottom-right',
      }
    );
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover-lift transition-smooth group shadow-sm hover:shadow-md">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 h-40 sm:h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badge */}
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-slide-in">
            -{discount}%
          </div>
        )}

        {product.featured && (
          <div className="absolute top-2 right-2 bg-secondary text-white px-2 py-1 rounded-full text-xs font-bold animate-slide-in-right">
            Featured
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute bottom-2 right-2 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100 transition-smooth transform hover:scale-110 active:scale-95"
          aria-label="Add to favorites"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        {/* Category */}
        <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-1">
          {product.category}
        </p>

        {/* Product Name */}
        <Link href={`/product/${product.id}`}>
          <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-2 hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base sm:text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isLoading}
          className="w-full py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium transition-smooth flex items-center justify-center gap-2 hover-lift hover:shadow-md disabled:opacity-75 active:scale-95 text-sm"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{isLoading ? 'Adding...' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
}
