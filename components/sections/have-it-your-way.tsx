/**
 * Have It Your Way Section Component
 * Showcases flexible workspace options with animations
 */

"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Clock, Users, Zap } from "lucide-react"
import { useLocale, useTranslations } from "@/lib/i18n"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Clock,
    titleKey: "sections.haveItYourWay.features.0.title",
    descriptionKey: "sections.haveItYourWay.features.0.description",
    color: "blue",
  },
  {
    icon: Users,
    titleKey: "sections.haveItYourWay.features.1.title",
    descriptionKey: "sections.haveItYourWay.features.1.description",
    color: "green",
  },
  {
    icon: Zap,
    titleKey: "sections.haveItYourWay.features.2.title",
    descriptionKey: "sections.haveItYourWay.features.2.description",
    color: "purple",
  },
]

const colorClasses = {
  blue: {
    bg: "bg-blue-100",
    bgHover: "group-hover:bg-blue-600",
    text: "text-blue-600",
    textHover: "group-hover:text-white",
  },
  green: {
    bg: "bg-green-100",
    bgHover: "group-hover:bg-green-600",
    text: "text-green-600",
    textHover: "group-hover:text-white",
  },
  purple: {
    bg: "bg-purple-100",
    bgHover: "group-hover:bg-purple-600",
    text: "text-purple-600",
    textHover: "group-hover:text-white",
  },
}

export default function HaveItYourWaySection() {
  const { locale } = useLocale()
  const { t } = useTranslations(locale)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

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
    <section className="section-padding bg-white" dir={locale === "ar" ? "rtl" : "ltr"} ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div initial="hidden" animate={controls} variants={containerVariants} className="text-center mb-16">
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("sections.haveItYourWay.title")}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("sections.haveItYourWay.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            const colors = colorClasses[feature.color as keyof typeof colorClasses]

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
              >
                <Card className="group h-full hover:shadow-xl transition-all duration-500 border-0 shadow-lg overflow-hidden">
                  <CardContent className="p-8 text-center h-full flex flex-col">
                    <div
                      className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 ${colors.bgHover}`}
                    >
                      <Icon className={`h-8 w-8 ${colors.text} transition-colors duration-300 ${colors.textHover}`} />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                      {t(feature.titleKey)}
                    </h3>

                    <p className="text-gray-600 leading-relaxed flex-grow group-hover:text-gray-700 transition-colors">
                      {t(feature.descriptionKey)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-100 to-teal-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-teal-100 to-purple-100 rounded-full opacity-20 blur-3xl"></div>
        </div>
      </div>
    </section>
  )
}
