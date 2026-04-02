import { Suspense } from 'react'
import ProductListingClient from "@/components/product-listing-client"

export const metadata = {
  title: 'All Products | Next-Cart',
  description: 'Shop all products across our categories at Next-Cart.',
}

function ProductsContent() {
  return <ProductListingClient />
}

export default function ProductsPage() {
  return (
    <div className="w-full">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <ProductsContent />
      </Suspense>
    </div>
  )
}
