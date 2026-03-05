import { Suspense } from "react"
import ProductListingClient from "@/components/product-listing-client"

export const metadata = {
  title: "Products | Next-Cart",
  description: "Browse all products on Next-Cart marketplace",
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8 text-muted-foreground">Loading products...</div>}>
      <ProductListingClient />
    </Suspense>
  )
}
