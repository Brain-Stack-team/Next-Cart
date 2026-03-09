'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    title: 'New Arrivals',
    subtitle: 'Discover the Latest Fashion Trends',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    cta: 'Shop Now',
    color: 'from-purple-600 to-blue-600'
  },
  {
    id: 2,
    title: 'Summer Sale',
    subtitle: 'Get Up to 50% Off on Selected Items',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&q=80',
    cta: 'Explore Deals',
    color: 'from-pink-500 to-purple-600'
  },
  {
    id: 3,
    title: 'Tech Collection',
    subtitle: 'Premium Electronics with Best Prices',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80',
    cta: 'View Collection',
    color: 'from-teal-500 to-cyan-600'
  }
];

export default function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlay(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
  };

  return (
    <div className="relative w-full h-96 sm:h-[500px] overflow-hidden rounded-2xl shadow-lg">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className={`relative h-full flex flex-col justify-center px-6 sm:px-12 ${index === currentSlide ? 'animate-slide-slider' : ''}`}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 text-pretty">
              {slide.title}
            </h1>
            <p className="text-base sm:text-lg text-gray-100 mb-6 sm:mb-8 max-w-md text-pretty">
              {slide.subtitle}
            </p>
            <Link
              href="#products"
              className="inline-block w-fit px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold transition-smooth hover-lift active:scale-95"
            >
              {slide.cta}
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-smooth backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-smooth backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-primary w-8'
                : 'bg-white/50 w-3 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-6 right-6 z-20 text-white text-sm bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
}
