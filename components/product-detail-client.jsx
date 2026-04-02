"use client"

import { useState } from "react"
import Link from "next/link"
import { Star, Minus, Plus, ShoppingCart, Heart, ShieldCheck, RefreshCcw, Truck, Store, Check } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { toast } from "sonner"
import ProductCard from "@/components/product-card"
import { products } from "@/lib/data"

export default function ProductDetailClient({ product }) {
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  
  const { addItem } = useCart()

  // Generate a mock gallery of the same image just to match the visual design
  const gallery = [product.image, product.image, product.image]
  
  // Recommend 4 similar products
  const recommended = products.filter(p => p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product)
    toast.success(`${qty}x ${product.name} added to cart`)
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6 sm:py-10 bg-white min-h-screen">
      {/* Breadcrumbs */}
      <nav className="flex text-[13px] text-gray-500 font-medium mb-6 sm:mb-10">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-[#4f46e5] transition-colors">Home</Link></li>
          <li><span>›</span></li>
          <li><Link href="/products" className="hover:text-[#4f46e5] transition-colors">Products</Link></li>
          <li><span>›</span></li>
          <li><span className="cursor-default">{product.category}</span></li>
          <li><span>›</span></li>
          <li><span className="text-gray-800 cursor-default">{product.name}</span></li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
        {/* Left: Images */}
        <div className="lg:w-[45%] flex flex-col gap-4">
          <div className="aspect-[4/3] rounded-[24px] overflow-hidden bg-gray-50 border border-gray-100 shadow-sm relative">
            <img
              src={gallery[activeImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          </div>
          <div className="flex gap-4">
            {gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-[80px] h-[80px] rounded-[16px] overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx ? "border-[#4f46e5]" : "border-transparent hover:border-gray-200"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="lg:w-[55%] flex flex-col">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-indigo-50 text-[#4f46e5] text-[11px] font-bold rounded-full mb-3">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-[#1f2937] leading-tight mb-2">
              {product.name}
            </h1>
            <p className="text-[13px] text-gray-500 font-medium">{product.brand}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-[14px] h-[14px] ${
                    i < Math.floor(product.rating) ? "fill-[#fbbf24] text-[#fbbf24]" : "text-gray-200 fill-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-[13px] font-bold text-gray-800">{product.rating}</span>
            <span className="text-[13px] text-gray-500">({product.reviews.toLocaleString()} reviews)</span>
          </div>

          {/* Price Box */}
          <div className="bg-[#f8f9fa] rounded-[20px] p-5 mb-6 border border-gray-100">
            <div className="flex items-end gap-3 mb-1">
              <span className="text-[32px] font-extrabold text-[#4f46e5] leading-none">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-[16px] font-medium text-gray-400 line-through mb-1">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="bg-[#ff4757] text-white text-[11px] font-bold px-2 py-0.5 rounded-full mb-2">
                    -{product.discount}%
                  </span>
                </>
              )}
            </div>
            <p className="text-[11px] text-gray-500 font-medium">Inclusive of all taxes</p>
          </div>

          {/* Stock & Quantity */}
          <div className="mb-8">
            <div className="flex items-center gap-1.5 mb-4">
              <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
              <span className={`text-[13px] font-bold ${product.stock > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <p className="text-[13px] font-bold text-gray-800 mb-2">Quantity</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 rounded-[10px] h-[40px] bg-white">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-[40px] h-full flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors rounded-l-[10px]"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <div className="w-[40px] h-full flex items-center justify-center text-[13px] font-bold text-gray-800 border-x border-gray-100">
                  {qty}
                </div>
                <button
                  onClick={() => setQty(Math.min(product.stock || 99, qty + 1))}
                  className="w-[40px] h-full flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors rounded-r-[10px]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[12px] text-gray-500">Max {product.stock || 5} items</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={handleAddToCart}
              disabled={!product.stock}
              className="flex-1 max-w-[200px] h-[48px] bg-[#4f46e5] text-white rounded-[12px] text-[14px] font-bold flex items-center justify-center gap-2 hover:bg-indigo-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-[18px] h-[18px]" />
              Add to Cart
            </button>
            <button
              onClick={handleAddToCart}
              disabled={!product.stock}
              className="flex-1 max-w-[200px] h-[48px] bg-[#f97316] text-white rounded-[12px] text-[14px] font-bold flex items-center justify-center hover:bg-[#ea580c] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Buy Now
            </button>
            <button className="w-[48px] h-[48px] border border-gray-200 rounded-[12px] flex items-center justify-center text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors">
              <Heart className="w-[20px] h-[20px]" />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="bg-[#f8f9fa] border border-gray-100 rounded-[16px] p-4 flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="flex gap-3">
              <div className="w-[36px] h-[36px] rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                <Truck className="w-4 h-4 text-[#4f46e5]" />
              </div>
              <div>
                <p className="text-[12px] font-bold text-gray-800 mb-0.5">Free Delivery</p>
                <p className="text-[10px] text-gray-500">On orders over $50</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-[36px] h-[36px] rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#4f46e5]" />
              </div>
              <div>
                <p className="text-[12px] font-bold text-gray-800 mb-0.5">Secure Payment</p>
                <p className="text-[10px] text-gray-500">100% protected</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-[36px] h-[36px] rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                <RefreshCcw className="w-4 h-4 text-[#4f46e5]" />
              </div>
              <div>
                <p className="text-[12px] font-bold text-gray-800 mb-0.5">Easy Returns</p>
                <p className="text-[10px] text-gray-500">30-day return policy</p>
              </div>
            </div>
          </div>

          {/* Store Block */}
          <div className="border border-gray-200 rounded-[16px] p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-[36px] h-[36px] rounded-full bg-indigo-50 flex items-center justify-center">
                <Store className="w-4 h-4 text-[#4f46e5]" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-gray-800">Sold by {product.seller || "TechWorld Store"}</p>
                <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                  <span className="flex items-center text-[#fbbf24]"><Star className="w-3 h-3 fill-current mr-1" /> 4.8 rating</span>
                  <span>•</span>
                  <span>158 products</span>
                </div>
              </div>
            </div>
            <button className="w-full py-2.5 border border-gray-200 rounded-[10px] text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors">
              Visit Store
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <div className="flex gap-6 border-b border-gray-100 mb-8">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-3 text-[14px] font-bold transition-colors relative ${
              activeTab === "description" ? "text-[#4f46e5]" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Description
            {activeTab === "description" && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4f46e5] rounded-t-full"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 text-[14px] font-bold transition-colors relative ${
              activeTab === "reviews" ? "text-[#4f46e5]" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Reviews ({product.reviews})
            {activeTab === "reviews" && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4f46e5] rounded-t-full"></div>
            )}
          </button>
        </div>

        <div className="max-w-[800px]">
          {activeTab === "description" && (
            <div className="text-[14px] text-gray-600 leading-relaxed space-y-6">
              <p>
                {product.description} Experience premium quality with our carefully curated products. 
                Designed to integrate seamlessly into your lifestyle, offering both exceptional performance and unmatched reliability.
              </p>
              
              <div>
                <h4 className="text-[#1f2937] font-bold mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#4f46e5] mt-0.5" />
                    <span>Active Noise Cancellation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#4f46e5] mt-0.5" />
                    <span>30-hour battery life</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#4f46e5] mt-0.5" />
                    <span>Premium sound quality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#4f46e5] mt-0.5" />
                    <span>Comfortable over-ear design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#4f46e5] mt-0.5" />
                    <span>Bluetooth 5.0</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#4f46e5] mt-0.5" />
                    <span>Built-in microphone</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {activeTab === "reviews" && (
             <div className="text-[14px] text-gray-600 leading-relaxed">
               Reviews content will be populated here!
             </div>
          )}
        </div>
      </div>

      {/* You May Also Like */}
      <div className="mt-20">
        <h3 className="text-xl font-extrabold text-[#1f2937] mb-6">You May Also Like</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {recommended.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  )
}
