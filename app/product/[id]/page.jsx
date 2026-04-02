'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ShoppingCart, Heart, Star, ChevronRight, Truck, Shield, RotateCcw, Store, Check } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/lib/cart-context';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = parseInt(params.id);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const { addItem } = useCart();

  useEffect(() => {
    fetch('/data/products.json')
      .then(res => res.json())
      .then(data => {
        const current = data.products.find(p => p.id === productId);
        setProduct(current);

        // Find related products
        const related = data.products
          .filter(p => p.category === current?.category && p.id !== productId)
          .slice(0, 3);
        setRelatedProducts(related);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading product:', err);
        setLoading(false);
      });
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      toast.success(`Added ${quantity} ${product.name} to cart!`);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addItem(product, quantity);
      window.location.href = '/cart';
    }
  };

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

  // Mock images for gallery (using same image for demo)
  const productImages = [product.image, product.image, product.image];

  const keyFeatures = [
    'Active Noise Cancellation',
    '30-hour battery life',
    'Premium sound quality',
    'Comfortable over-ear design',
    'Bluetooth 5.0',
    'Built-in microphone'
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-6">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-indigo-600 transition-colors">Products</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/products?category=${product.category.toLowerCase()}`} className="hover:text-indigo-600 transition-colors">{product.category}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-3xl overflow-hidden aspect-square flex items-center justify-center p-8">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain drop-shadow-2xl"
                crossOrigin="anonymous"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-3 gap-4">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-2xl overflow-hidden aspect-square flex items-center justify-center p-4 transition-all ${
                    selectedImage === idx ? 'ring-4 ring-indigo-500 scale-95' : 'hover:scale-105'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-contain"
                    crossOrigin="anonymous"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            {/* Category Badge */}
            <Link href={`/products?category=${product.category.toLowerCase()}`} className="inline-block mb-4">
              <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full hover:bg-indigo-100 transition-colors">
                {product.category}
              </span>
            </Link>

            {/* Product Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Brand */}
            <p className="text-gray-600 mb-4">{product.brand || 'AudioMax'}</p>

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
              <span className="text-gray-900 font-semibold">{product.rating}</span>
              <span className="text-gray-500">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-indigo-600">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="text-sm font-bold text-white bg-red-500 px-2 py-1 rounded">
                  -{discount}%
                </span>
              </div>
              <p className="text-sm text-gray-500">Inclusive of all taxes</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-600 font-semibold">In Stock</span>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-50 transition-colors text-lg font-semibold"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-semibold min-w-[60px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-50 transition-colors text-lg font-semibold"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">Max 43 items</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <button 
                onClick={handleAddToCart}
                className="flex-1 py-3.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all hover:shadow-lg flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button 
                onClick={handleBuyNow}
                className="flex-1 py-3.5 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all hover:shadow-lg"
              >
                Buy Now
              </button>
              <button className="p-3.5 border-2 border-gray-200 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all group">
                <Heart className="w-5 h-5 text-gray-400 group-hover:text-red-500 group-hover:fill-red-500 transition-all" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-2">
                  <Truck className="w-6 h-6 text-indigo-600" />
                </div>
                <p className="text-xs font-semibold text-gray-900">Free Delivery</p>
                <p className="text-xs text-gray-500">1-2 week</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-2">
                  <Shield className="w-6 h-6 text-indigo-600" />
                </div>
                <p className="text-xs font-semibold text-gray-900">Secure Payment</p>
                <p className="text-xs text-gray-500">100% protected</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-2">
                  <RotateCcw className="w-6 h-6 text-indigo-600" />
                </div>
                <p className="text-xs font-semibold text-gray-900">Easy Returns</p>
                <p className="text-xs text-gray-500">30-day return policy</p>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Store className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sold by TechWorld Store</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">4.8 rating</span>
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">198 products</span>
                  </div>
                </div>
              </div>
              <button className="w-full py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-white transition-colors">
                Visit Store
              </button>
            </div>
          </div>
        </div>

        {/* Description & Reviews Tabs */}
        <div className="bg-white rounded-3xl p-8 shadow-sm mb-12">
          {/* Tabs */}
          <div className="flex gap-8 border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 font-semibold transition-colors relative ${
                activeTab === 'description'
                  ? 'text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Description
              {activeTab === 'description' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 font-semibold transition-colors relative ${
                activeTab === 'reviews'
                  ? 'text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Reviews ({product.reviews})
              {activeTab === 'reviews' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
              )}
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'description' && (
            <div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {product.description}
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features:</h3>
              <ul className="space-y-3">
                {keyFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="text-center py-12">
              <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
              <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                Write a Review
              </button>
            </div>
          )}
        </div>

        {/* You May Also Like */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              You May Also Like
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gray-100 overflow-hidden group">
                    {relatedProduct.discount && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                        -{relatedProduct.discount}%
                      </span>
                    )}
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-red-50 transition-colors z-10 group/heart">
                      <Heart className="w-4 h-4 text-gray-400 group-hover/heart:text-red-500 group-hover/heart:fill-red-500 transition-all" />
                    </button>
                    <Link href={`/product/${relatedProduct.id}`}>
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        crossOrigin="anonymous"
                      />
                    </Link>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <p className="text-xs text-gray-500 mb-1">{relatedProduct.brand || 'Brand'}</p>
                    <Link href={`/product/${relatedProduct.id}`}>
                      <h3 className="font-semibold text-gray-900 mb-2 hover:text-indigo-600 transition-colors line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-gray-900">{relatedProduct.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">({relatedProduct.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-xl font-bold text-indigo-600">
                        ${relatedProduct.price.toFixed(2)}
                      </span>
                      {relatedProduct.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ${relatedProduct.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <button className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
