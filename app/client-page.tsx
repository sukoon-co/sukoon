"use client"
import Navigation from "@/components/layout/navigation"
import Footer from "@/components/layout/footer"
import { useI18n } from "@/lib/i18n"


import Image from "next/image"
import { useState, useEffect } from "react"
import HeroSection from "@/components/sections/hero-section"
import ServicesSection from "@/components/sections/services-section"
import OfferSection from "@/components/sections/offer-section"
import FacilitiesSection from "@/components/sections/facilities-section"
import ContactSection from "@/components/sections/contact-section"

export default function ClientHomePage() {
  const { t, dir, isLoading } = useI18n()
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = ["home", "services", "about", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" dir={dir}>
      {/* Navigation */}
      <Navigation isScrolled={isScrolled} activeSection={activeSection} />

      {/* Main Content */}
      <main className="overflow-hidden">
        {/* Hero Section */}
        <HeroSection />

        {/* Services Section */}
        <ServicesSection />

        {/* Offer Section */}
        <OfferSection />

        {/* Facilities Section */}
        <FacilitiesSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
