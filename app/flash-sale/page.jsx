import ProductListingClient from "@/components/product-listing-client"

export const metadata = {
  title: 'Flash Sale | Next-Cart',
  description: 'Shop exclusive temporary deals and flash sales at Next-Cart.',
}

export default function FlashSalePage() {
  return (
    <div className="w-full">
      <ProductListingClient title="Flash Sale" />
    </div>
  )
}
