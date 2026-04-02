"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { products, categories as dbCategories } from "@/lib/data"
import ProductCard from "@/components/product-card"
import { SlidersHorizontal, X, ChevronDown, Check } from "lucide-react"
import * as Slider from '@radix-ui/react-slider'
import * as Checkbox from '@radix-ui/react-checkbox'

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "popularity", label: "Popularity" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "rating", label: "Top Rated" },
]

export default function ProductListingClient({ title = "All Products" }) {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || ""
  const initialTag = searchParams.get("tag") || ""

  const [sort, setSort] = useState("featured")
  const [selectedCategories, setSelectedCategories] = useState(initialCategory ? [initialCategory] : [])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedRatings, setSelectedRatings] = useState([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Extract unique brands dynamically
  const brands = useMemo(() => {
    const allBrands = products.map(p => p.brand).filter(Boolean);
    return [...new Set(allBrands)].sort();
  }, [])

  const filtered = useMemo(() => {
    let result = [...products]

    if (initialTag) {
      result = result.filter((p) => p.tags?.includes(initialTag))
    }
    
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category.toLowerCase()))
    }
    
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand))
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    
    if (selectedRatings.length > 0) {
      // Find the lowest selected rating check (e.g. 4 means 4 & above)
      const minSelected = Math.min(...selectedRatings);
      result = result.filter((p) => p.rating >= minSelected)
    }

    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        result.sort((a, b) => b.id - a.id)
        break
      case "popularity":
        result.sort((a, b) => b.reviews - a.reviews)
        break
      case "featured":
      default:
        // Assume default order is featured
        break;
    }

    return result
  }, [sort, selectedCategories, selectedBrands, priceRange, selectedRatings, initialTag])

  const toggleCategory = (slug) => {
    setSelectedCategories(prev => 
      prev.includes(slug) ? prev.filter(c => c !== slug) : [...prev, slug]
    )
  }

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    )
  }
  
  const toggleRating = (rating) => {
    setSelectedRatings(prev => 
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    )
  }

  const FilterSidebar = () => (
    <div className="flex flex-col gap-8 text-[#1f2937]">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">Filters</h3>
      </div>
      
      {/* Category filter */}
      <div>
        <h4 className="font-semibold text-[15px] mb-4">Category</h4>
        <div className="flex flex-col gap-3">
          {dbCategories.map((c) => (
            <label key={c.id} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <Checkbox.Root 
                  checked={selectedCategories.includes(c.slug)}
                  onCheckedChange={() => toggleCategory(c.slug)}
                  className="w-[18px] h-[18px] rounded-[4px] border border-gray-300 flex items-center justify-center bg-white data-[state=checked]:bg-[#1f2937] data-[state=checked]:border-[#1f2937] transition-colors outline-none"
                >
                  <Checkbox.Indicator>
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <span className="text-[13px] text-gray-700 group-hover:text-[#1f2937] transition-colors">{c.name}</span>
              </div>
              <span className="text-[12px] text-gray-400">{c.count > 100 ? (c.count / 1000).toFixed(1) + 'k' : c.count}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price filter */}
      <div>
        <h4 className="font-semibold text-[15px] mb-4">Price Range</h4>
        <div className="px-2 mb-6 mt-2">
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            value={priceRange}
            max={1000}
            step={10}
            onValueChange={setPriceRange}
          >
            <Slider.Track className="bg-gray-200 relative grow rounded-full h-[6px]">
              <Slider.Range className="absolute bg-[#4f46e5] rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-4 h-4 bg-[#4f46e5] shadow-[0_2px_10px_rgba(0,0,0,0.1)] rounded-full hover:bg-indigo-700 outline-none cursor-pointer" />
            <Slider.Thumb className="block w-4 h-4 bg-[#4f46e5] shadow-[0_2px_10px_rgba(0,0,0,0.1)] rounded-full hover:bg-indigo-700 outline-none cursor-pointer" />
          </Slider.Root>
        </div>
        <div className="flex items-center justify-between text-[13px] font-medium text-gray-700">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Rating filter */}
      <div>
        <h4 className="font-semibold text-[15px] mb-4">Rating</h4>
        <div className="flex flex-col gap-3">
          {[4, 3, 2, 1].map((r) => (
            <label key={r} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox.Root 
                checked={selectedRatings.includes(r)}
                onCheckedChange={() => toggleRating(r)}
                className="w-[18px] h-[18px] rounded-[4px] border border-gray-300 flex items-center justify-center bg-white data-[state=checked]:bg-[#1f2937] data-[state=checked]:border-[#1f2937] transition-colors outline-none cursor-pointer"
              >
                <Checkbox.Indicator>
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <div className="flex items-center gap-1.5 text-[13px] text-gray-700 group-hover:text-[#1f2937]">
                <span className="font-medium">{r}★</span> & above
              </div>
            </label>
          ))}
        </div>
      </div>
      
      {/* Brand filter */}
      <div>
        <h4 className="font-semibold text-[15px] mb-4">Brand</h4>
        <div className="flex flex-col gap-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox.Root 
                checked={selectedBrands.includes(b)}
                onCheckedChange={() => toggleBrand(b)}
                className="w-[18px] h-[18px] rounded-[4px] border border-gray-300 flex items-center justify-center bg-white data-[state=checked]:bg-[#1f2937] data-[state=checked]:border-[#1f2937] transition-colors outline-none cursor-pointer"
              >
                <Checkbox.Indicator>
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <span className="text-[13px] text-gray-700 group-hover:text-[#1f2937] transition-colors">{b}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-[#fafbfc] min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-6 border-b border-gray-200 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1f2937] mb-2">{title}</h1>
          <p className="text-[14px] text-gray-500 font-medium">{filtered.length} products found</p>
        </div>
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="lg:hidden flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-medium shadow-sm hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
          
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-white text-gray-800 px-4 py-2.5 pr-10 rounded-xl text-[14px] font-medium border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer hover:border-gray-300 transition-colors"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex gap-8 lg:gap-12 items-start">
        {/* Sidebar - desktop */}
        <aside className="hidden lg:block w-[240px] shrink-0 sticky top-24 pb-12">
          <FilterSidebar />
        </aside>

        {/* Mobile filters overlay */}
        {filtersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-[#1f2937]/50 backdrop-blur-sm transition-opacity" onClick={() => setFiltersOpen(false)} />
            <div className="fixed right-0 top-0 bottom-0 w-[280px] bg-white p-6 overflow-y-auto shadow-2xl transition-transform transform">
              <div className="flex items-center justify-end mb-2">
                <button onClick={() => setFiltersOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <FilterSidebar />
            </div>
          </div>
        )}

        {/* Products grid */}
        <div className="flex-1 w-full min-w-0">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
             <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center justify-center text-center shadow-sm">
              <p className="text-xl font-bold text-[#1f2937] mb-2">No products found</p>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
              <button 
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedBrands([]);
                  setSelectedRatings([]);
                  setPriceRange([0, 1000]);
                }} 
                className="mt-6 px-6 py-2.5 bg-indigo-50 text-[#4f46e5] font-bold rounded-xl hover:bg-indigo-100 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
