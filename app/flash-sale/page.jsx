import { Suspense } from 'react'
import ProductListingClient from "@/components/product-listing-client"

export const metadata = {
  title: 'Flash Sale | Next-Cart',
  description: 'Shop exclusive temporary deals and flash sales at Next-Cart.',
}

function FlashSaleContent() {
  return <ProductListingClient title="Flash Sale" />
}

export default function FlashSalePage() {
  return (
    <div className="w-full">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <FlashSaleContent />
      </Suspense>
    </div>
  )
}
