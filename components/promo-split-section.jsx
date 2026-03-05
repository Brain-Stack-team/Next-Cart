"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function PromoSplitSection({
  subtitle = "New Season Edit",
  title = "Elevated Essentials For Everyday Statement Style",
  description = "Discover curated fashion and lifestyle arrivals designed with premium materials, clean silhouettes, and confident details for modern living.",
  buttonLabel = "Explore Collection",
  buttonHref = "/products",
  imageSrc = "/images/image2.jpg",
  imageAlt = "Model wearing contemporary fashion",
}) {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.18 },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`mx-4 mt-14 overflow-hidden bg-white transition-all duration-700 ease-out lg:mx-0 lg:mt-16 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="grid lg:grid-cols-2">
        <div className="group relative min-h-[300px] sm:min-h-[380px] md:min-h-[460px] lg:min-h-[640px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority={false}
          />
        </div>

        <div className="flex items-center bg-gradient-to-br from-[#f6f1ed] via-[#f9f5f1] to-[#f0e8e2] px-8 py-16 sm:px-10 sm:py-20 md:px-14 md:py-20 lg:px-16 lg:py-24 xl:px-20">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-600 sm:text-sm">
              {subtitle}
            </p>

            <h2 className="mt-5 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-5xl xl:text-6xl">
              {title}
            </h2>

            <p className="mt-6 text-base leading-relaxed text-slate-700 md:text-lg">
              {description}
            </p>

            <Link
              href={buttonHref}
              className="mt-9 inline-flex items-center rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/40"
            >
              {buttonLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
