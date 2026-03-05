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
        if (seconds < 0) {
          seconds = 59
          minutes--
        }
        if (minutes < 0) {
          minutes = 59
          hours--
        }
        if (hours < 0) {
          hours = 23
          minutes = 59
          seconds = 59
        }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const pad = (n) => String(n).padStart(2, "0")

  return (
    <section className="mx-4 mt-14 rounded-3xl bg-[linear-gradient(140deg,#f8f9fb_0%,#eef3fb_100%)] px-4 py-14 sm:px-6 md:px-7 lg:mx-0 lg:mt-16 lg:py-16">
      <div className="mx-auto max-w-3xl text-center">
  <div className="flex items-center justify-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
      <Zap className="h-5 w-5" />
    </div>

    <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
      Flash Sale Picks
    </h2>
  </div>

  <p className="mt-2 text-sm text-slate-600 md:text-base">
    Limited-time deals selected for maximum savings before the timer runs out.
  </p>
</div>

      <div className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-600 md:mt-6">
        <span className="mr-1 font-medium">Ends in</span>
        {[pad(timeLeft.hours), pad(timeLeft.minutes), pad(timeLeft.seconds)].map((v, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="min-w-[40px] rounded-lg bg-slate-900 px-2 py-1 text-center font-mono font-bold text-white">
              {v}
            </span>
            {i < 2 && <span className="font-bold text-slate-400">:</span>}
          </span>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {flashProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
