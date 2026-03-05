"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { products, categories } from "@/lib/data"
import ProductCard from "@/components/product-card"
import { SlidersHorizontal, X, ChevronDown } from "lucide-react"

const sortOptions = [
  { value: "popularity", label: "Popularity" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "rating", label: "Top Rated" },
]

export default function ProductListingClient() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || ""
  const initialTag = searchParams.get("tag") || ""

  const [sort, setSort] = useState("popularity")
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [priceRange, setPriceRange] = useState([0, 500])
  const [minRating, setMinRating] = useState(0)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    let result = [...products]

    if (selectedCategory) {
      result = result.filter((p) => p.category.toLowerCase() === selectedCategory)
    }
    if (initialTag) {
      result = result.filter((p) => p.tags.includes(initialTag))
    }
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating)
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
      default:
        result.sort((a, b) => b.reviews - a.reviews)
    }

    return result
  }, [sort, selectedCategory, priceRange, minRating, initialTag])

  const FilterSidebar = () => (
    <div className="flex flex-col gap-6">
      {/* Category filter */}
      <div>
        <h4 className="font-semibold text-sm text-foreground mb-3">Category</h4>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => setSelectedCategory("")}
            className={`text-left text-sm px-3 py-2 rounded-lg transition ${
              !selectedCategory ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
            }`}
          >
            All Categories
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.slug)}
              className={`text-left text-sm px-3 py-2 rounded-lg transition ${
                selectedCategory === c.slug ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price filter */}
      <div>
        <h4 className="font-semibold text-sm text-foreground mb-3">Price Range</h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            className="w-full rounded-lg bg-secondary text-secondary-foreground px-3 py-2 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="Min"
          />
          <span className="text-muted-foreground">-</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="w-full rounded-lg bg-secondary text-secondary-foreground px-3 py-2 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="Max"
          />
        </div>
      </div>

      {/* Rating filter */}
      <div>
        <h4 className="font-semibold text-sm text-foreground mb-3">Minimum Rating</h4>
        <div className="flex flex-col gap-1.5">
          {[0, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`text-left text-sm px-3 py-2 rounded-lg transition ${
                minRating === r ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
              }`}
            >
              {r === 0 ? "All Ratings" : `${r}+ Stars`}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {selectedCategory
              ? categories.find((c) => c.slug === selectedCategory)?.name || "Products"
              : initialTag
              ? initialTag.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())
              : "All Products"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{filtered.length} products found</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="lg:hidden flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-secondary text-secondary-foreground px-4 py-2 pr-8 rounded-lg text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar - desktop */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 bg-card border border-border rounded-xl p-5">
            <FilterSidebar />
          </div>
        </aside>

        {/* Mobile filters overlay */}
        {filtersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-foreground/30" onClick={() => setFiltersOpen(false)} />
            <div className="fixed right-0 top-0 bottom-0 w-80 bg-card p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground">Filters</h3>
                <button onClick={() => setFiltersOpen(false)}>
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>
              <FilterSidebar />
            </div>
          </div>
        )}

        {/* Products grid */}
        <div className="flex-1">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-lg text-muted-foreground">No products found</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
