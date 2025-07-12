"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Users, Building, Video, GraduationCap, CheckCircle } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    id: "coworking",
    icon: Users,
    color: "blue",
  },
  {
    id: "private",
    icon: Building,
    color: "green",
  },
  {
    id: "meeting",
    icon: Video,
    color: "purple",
  },
  {
    id: "training",
    icon: GraduationCap,
    color: "orange",
  },
]

const colorClasses = {
  blue: {
    bg: "bg-blue-100",
    bgHover: "group-hover:bg-blue-600",
    text: "text-blue-600",
    textHover: "group-hover:text-white",
    border: "border-blue-200",
  },
  green: {
    bg: "bg-green-100",
    bgHover: "group-hover:bg-green-600",
    text: "text-green-600",
    textHover: "group-hover:text-white",
    border: "border-green-200",
  },
  purple: {
    bg: "bg-purple-100",
    bgHover: "group-hover:bg-purple-600",
    text: "text-purple-600",
    textHover: "group-hover:text-white",
    border: "border-purple-200",
  },
  orange: {
    bg: "bg-orange-100",
    bgHover: "group-hover:bg-orange-600",
    text: "text-orange-600",
    textHover: "group-hover:text-white",
    border: "border-orange-200",
  },
}

export default function ServicesSection() {
  const { t, dir } = useI18n()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const scrollToContact = () => {
    const element = document.querySelector("#contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="services" className="py-20 bg-gray-50" dir={dir} ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("services.title")}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("services.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service) => {
            const Icon = service.icon
            const colors = colorClasses[service.color as keyof typeof colorClasses]

            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
              >
                <Card
                  className={`group h-full hover:shadow-xl transition-all duration-500 border-2 ${colors.border} overflow-hidden`}
                >
                  <CardContent className="p-6 text-center h-full flex flex-col">
                    <div
                      className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 ${colors.bgHover}`}
                    >
                      <Icon className={`h-8 w-8 ${colors.text} transition-colors duration-300 ${colors.textHover}`} />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                      {t(`services.${service.id}.title`)}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow group-hover:text-gray-700 transition-colors">
                      {t(`services.${service.id}.description`)}
                    </p>

                    <div className="space-y-2 mb-6">
                      {[0, 1, 2].map((index) => (
                        <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-600">{t(`services.${service.id}.features.${index}`)}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={scrollToContact}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white transition-all duration-300 transform group-hover:scale-105"
                    >
                      {t("common.registerNow")}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
