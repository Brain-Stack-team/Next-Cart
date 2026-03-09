'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ShoppingCart, Heart, Star, ChevronLeft } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = parseInt(params.id);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/products.json')
      .then(res => res.json())
      .then(data => {
        const current = data.products.find(p => p.id === productId);
        setProduct(current);

        // Find related products
        const related = data.products
          .filter(p => p.category === current?.category && p.id !== productId)
          .slice(0, 4);
        setRelatedProducts(related);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading product:', err);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-xl mb-8" />
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
            <div className="h-6 bg-gray-200 rounded w-1/4" />
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Link href="/" className="text-primary hover:underline">
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <main className="min-h-screen bg-white py-8 sm:py-12">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-blue-700 mb-6 w-fit">
          <ChevronLeft className="w-4 h-4" />
          Back to Shop
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product Main Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Image */}
          <div className="flex items-center justify-center bg-gray-100 rounded-2xl overflow-hidden h-96 md:h-full animate-scale-in">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center animate-slide-in-right">
            {/* Category & Rating */}
            <p className="text-sm font-semibold text-secondary uppercase tracking-wide mb-2">
              {product.category}
            </p>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="text-lg font-bold text-red-500">
                  Save {discount}%
                </span>
              </div>
              <p className="text-gray-600">Free shipping on this item</p>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-8 text-lg">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-foreground font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100 transition-smooth"
                >
                  −
                </button>
                <span className="px-6 py-2 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100 transition-smooth"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-700 transition-smooth hover-lift flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="flex-1 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-smooth hover-lift flex items-center justify-center gap-2">
                <Heart className="w-5 h-5" />
                Add to Wishlist
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Availability</span>
                <span className="font-semibold text-green-600">In Stock (12 items)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">Free Worldwide Shipping</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Return Policy</span>
                <span className="font-semibold">30-day money back</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-gray-200">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Related Products
              </h2>
              <p className="text-gray-600">
                More products from the {product.category} category
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <div
                  key={relatedProduct.id}
                  style={{
                    animation: `slideIn 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <ProductCard product={relatedProduct} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
