import ProductListingClient from "@/components/product-listing-client"

export const metadata = {
  title: 'All Products | Next-Cart',
  description: 'Shop all products across our categories at Next-Cart.',
}

export default function ProductsPage() {
  return (
    <div className="w-full">
      <ProductListingClient />
    </div>
  )
}
