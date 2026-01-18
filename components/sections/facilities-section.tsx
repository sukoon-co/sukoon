"use client"
import { useI18n } from "@/lib/i18n"
import { Card, CardContent } from "@/components/ui/card"
import {
  Wifi,
  Coffee,
  Car,
  Shield,
  Printer,
  Phone,
  Globe,
  Headphones,
  Camera,
  Users,
  Star,
} from "lucide-react"

export default function FacilitiesSection() {
  const { t } = useI18n()

  const mainFacilities = [
    { icon: Wifi, color: "blue" },
    { icon: Coffee, color: "green" },
    { icon: Printer, color: "yellow" },
    { icon: Headphones, color: "purple" },
    // { icon: Shield, color: "red" },
    // { icon: Phone, color: "indigo" },
    // { icon: Globe, color: "pink" },
    // { icon: Headphones, color: "teal" },
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("sections.facilities.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("sections.facilities.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mainFacilities.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="text-center group">
                <div
                  className={`w-20 h-20 bg-${item.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-${item.color}-600 transition-colors`}
                >
                  <Icon className={`h-10 w-10 text-${item.color}-600 group-hover:text-white transition-colors`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {t(`sections.facilities.items.${index}.title`)}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t(`sections.facilities.items.${index}.description`)}
                </p>
                <p className="text-gray-600 text-xs">
                  {t(`sections.facilities.items.${index}.span`)}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}