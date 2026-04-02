"use client"

import Link from "next/link"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import {
  Search, ShoppingCart, User, Menu, X, ChevronDown,
  Monitor, Shirt, Sparkles, Home, Dumbbell, BookOpen, Gamepad2, ShoppingBasket,
} from "lucide-react"
import { categories } from "@/lib/data"

const iconMap = { Monitor, Shirt, Sparkles, Home, Dumbbell, BookOpen, Gamepad2, ShoppingBasket }

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">N</span>
          </div>
          <span className="font-bold text-xl text-foreground hidden sm:block">Next-Cart</span>
        </Link>

        {/* Search - desktop */}
        <div className="hidden md:flex flex-1 max-w-xl relative">
          <input
            type="text"
            placeholder="Search products, brands, categories..."
            className="w-full rounded-xl bg-secondary text-secondary-foreground placeholder:text-muted-foreground px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>

        {/* Right actions */}
        <nav className="flex items-center gap-2">
          {/* Categories dropdown - desktop */}
          <div className="hidden lg:block relative">
            <button
              onClick={() => setCatOpen(!catOpen)}
              className="flex items-center gap-1 px-3 py-2 text-sm text-foreground hover:bg-secondary rounded-lg transition"
            >
              Categories <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {catOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setCatOpen(false)} />
                <div className="absolute top-full left-0 mt-1 w-56 bg-card border border-border rounded-xl shadow-lg z-50 p-2">
                  {categories.map((c) => {
                    const Icon = iconMap[c.icon]
                    return (
                      <Link
                        key={c.id}
                        href={`/products?category=${c.slug}`}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground hover:bg-secondary rounded-lg transition"
                        onClick={() => setCatOpen(false)}
                      >
                        {Icon && <Icon className="w-4 h-4 text-primary" />}
                        <span>{c.name}</span>
                        <span className="ml-auto text-xs text-muted-foreground">{c.count}</span>
                      </Link>
                    )
                  })}
                </div>
              </>
            )}
          </div>

          <Link
            href="/cart"
            className="relative p-2 hover:bg-secondary rounded-lg transition"
          >
            <ShoppingCart className="w-5 h-5 text-foreground" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          <Link href="/account" className="p-2 hover:bg-secondary rounded-lg transition hidden sm:block">
            <User className="w-5 h-5 text-foreground" />
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="p-2 hover:bg-secondary rounded-lg transition lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile search */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-xl bg-secondary text-secondary-foreground placeholder:text-muted-foreground px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-border bg-card px-4 py-4">
          <nav className="flex flex-col gap-1">
            {categories.map((c) => {
              const Icon = iconMap[c.icon]
              return (
                <Link
                  key={c.id}
                  href={`/products?category=${c.slug}`}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground hover:bg-secondary rounded-lg transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {Icon && <Icon className="w-4 h-4 text-primary" />}
                  <span>{c.name}</span>
                </Link>
              )
            })}
            <hr className="border-border my-2" />
            <Link href="/account" className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground hover:bg-secondary rounded-lg" onClick={() => setMenuOpen(false)}>
              <User className="w-4 h-4 text-primary" />
              <span>My Account</span>
            </Link>
            <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground hover:bg-secondary rounded-lg" onClick={() => setMenuOpen(false)}>
              <Monitor className="w-4 h-4 text-primary" />
              <span>Admin Panel</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
