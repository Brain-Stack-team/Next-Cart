import { products } from "@/lib/data"
import { notFound } from "next/navigation"
import ProductDetailClient from "@/components/product-detail-client"

export async function generateMetadata({ params }) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) return { title: "Product Not Found" }
  return {
    title: `${product.name} | Next-Cart`,
    description: product.description,
  }
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) notFound()

  return <ProductDetailClient product={product} />
}
