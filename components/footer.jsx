import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-foreground text-background mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">N</span>
              </div>
              <span className="font-bold text-xl">Next-Cart</span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed mb-4">
              Your premium marketplace for quality products at unbeatable prices. Shop with confidence.
            </p>
            <div className="flex flex-col gap-2 text-sm opacity-70">
              <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@nextcart.com</span>
              <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> +1 (555) 123-4567</span>
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> San Francisco, CA</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-2 text-sm opacity-70">
              <li><Link href="/products" className="hover:opacity-100 transition">All Products</Link></li>
              <li><Link href="/products?tag=flash-sale" className="hover:opacity-100 transition">Flash Sales</Link></li>
              <li><Link href="/products?tag=trending" className="hover:opacity-100 transition">Trending</Link></li>
              <li><Link href="/dashboard" className="hover:opacity-100 transition">My Account</Link></li>
              <li><Link href="/cart" className="hover:opacity-100 transition">Cart</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="flex flex-col gap-2 text-sm opacity-70">
              <li><Link href="/products?category=electronics" className="hover:opacity-100 transition">Electronics</Link></li>
              <li><Link href="/products?category=fashion" className="hover:opacity-100 transition">Fashion</Link></li>
              <li><Link href="/products?category=beauty" className="hover:opacity-100 transition">Beauty</Link></li>
              <li><Link href="/products?category=home" className="hover:opacity-100 transition">Home & Living</Link></li>
              <li><Link href="/products?category=sports" className="hover:opacity-100 transition">Sports</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm opacity-70 mb-4">Subscribe for exclusive deals and updates.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-lg bg-background/10 border border-background/20 px-3 py-2 text-sm placeholder:text-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 text-background"
              />
              <button className="bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm opacity-60">
          <p>2026 Next-Cart. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:opacity-100 transition">Privacy</Link>
            <Link href="#" className="hover:opacity-100 transition">Terms</Link>
            <Link href="#" className="hover:opacity-100 transition">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
