"use client"

import { useState, useEffect } from "react"
import { Zap } from "lucide-react"
import { products } from "@/lib/data"
import ProductCard from "@/components/product-card"

export default function FlashSale() {
  const flashProducts = products.filter((p) => p.tags.includes("flash-sale"))
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 18 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) { seconds = 59; minutes-- }
        if (minutes < 0) { minutes = 59; hours-- }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59 }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const pad = (n) => String(n).padStart(2, "0")

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Zap className="w-6 h-6 text-accent" />
          <h2 className="text-2xl font-bold text-foreground">Flash Sale</h2>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm text-muted-foreground mr-2">Ends in</span>
          {[pad(timeLeft.hours), pad(timeLeft.minutes), pad(timeLeft.seconds)].map((v, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className="bg-foreground text-background text-sm font-mono font-bold px-2 py-1 rounded-md min-w-[36px] text-center">
                {v}
              </span>
              {i < 2 && <span className="text-muted-foreground font-bold">:</span>}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {flashProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
