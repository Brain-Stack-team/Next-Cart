"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, ShoppingCart, User, LayoutGrid } from "lucide-react"
import { useCart } from "@/lib/cart-context"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Browse", icon: LayoutGrid },
  { href: "/products?q=", label: "Search", icon: Search },
  { href: "/cart", label: "Cart", icon: ShoppingCart, badge: true },
  { href: "/dashboard", label: "Account", icon: User },
]

export default function MobileBottomNav() {
  const pathname = usePathname()
  const { itemCount } = useCart()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-lg border-t border-border lg:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href.split("?")[0])

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge && itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-accent text-accent-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
      {/* Safe area for notch phones */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  )
}
