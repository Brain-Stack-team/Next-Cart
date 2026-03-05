"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { banners } from "@/lib/data"

export default function HeroBanner() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative overflow-hidden rounded-2xl mx-4 mt-6 lg:mx-0">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((b) => (
          <div
            key={b.id}
            className="relative min-w-full rounded-2xl px-8 py-16 md:py-24 md:px-16 flex flex-col items-start justify-center overflow-hidden"
          >
            <img
              src={b.image}
              alt={b.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 text-balance">
                {b.title}
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-6">{b.subtitle}</p>
              <button className="bg-card text-card-foreground px-6 py-3 rounded-xl font-medium hover:shadow-lg transition">
                {b.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "w-6 bg-card" : "bg-card/50"
            }`}
          />
        ))}
      </div>
      <button
        onClick={() => setCurrent((current - 1 + banners.length) % banners.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-card/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-card/30 transition hidden md:block"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setCurrent((current + 1) % banners.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-card/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-card/30 transition hidden md:block"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </section>
  )
}
