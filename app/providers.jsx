"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/cart-context"
import { Toaster } from "sonner"

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <CartProvider>
        {children}
        <Toaster richColors position="top-right" />
      </CartProvider>
    </ThemeProvider>
  )
}
