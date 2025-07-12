"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const heroSlides = [
  {
    id: 1,
    title: "Premium Workspaces for Modern Professionals",
    subtitle: "Elevate your productivity in our state-of-the-art coworking spaces",
    description:
      "Join a community of ambitious freelancers and students in beautifully designed workspaces equipped with everything you need to succeed.",
    image: "/placeholder.svg?height=600&width=800",
    cta: "Book Your Space",
    ctaSecondary: "Take a Tour",
  },
  {
    id: 2,
    title: "Flexible Solutions for Every Need",
    subtitle: "From hot desks to private offices",
    description:
      "Whether you need a quiet corner for focused work or a collaborative space for team projects, we have the perfect solution for you.",
    image: "/placeholder.svg?height=600&width=800",
    cta: "Explore Plans",
    ctaSecondary: "Learn More",
  },
  {
    id: 3,
    title: "Community-Driven Innovation",
    subtitle: "Network, collaborate, and grow together",
    description:
      "Connect with like-minded professionals, attend exclusive events, and be part of a thriving community that supports your success.",
    image: "/placeholder.svg?height=600&width=800",
    cta: "Join Community",
    ctaSecondary: "View Events",
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-1000 ${
                  index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ display: index === currentSlide ? "block" : "none" }}
              >
                <div className="space-y-6 text-white">
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-blue-200">{slide.subtitle}</p>
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">{slide.title}</h1>
                  </div>
                  <p className="text-xl md:text-2xl text-gray-200 max-w-2xl leading-relaxed">{slide.description}</p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                      {slide.cta}
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg bg-transparent"
                    >
                      <Play className="mr-2 h-5 w-5" />
                      {slide.ctaSecondary}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          />
        ))}
      </div>

      {/* Auto-play control */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-8 right-8 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
      >
        {isAutoPlaying ? (
          <div className="w-4 h-4 flex items-center justify-center">
            <div className="w-1 h-3 bg-current mr-0.5"></div>
            <div className="w-1 h-3 bg-current"></div>
          </div>
        ) : (
          <Play className="h-4 w-4" />
        )}
      </button>
    </section>
  )
}
