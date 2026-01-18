"use client"

import { useState } from "react"
import { ChevronDown, Globe } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { localeConfig, type Locale } from "@/lib/i18n/config"

interface LanguageSwitcherProps {
  isScrolled?: boolean
}

export default function LanguageSwitcher({ isScrolled = false }: LanguageSwitcherProps) {
  const { locale, setLocale, t, dir } = useI18n()
  const [isOpen, setIsOpen] = useState(false)

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale)
    setIsOpen(false)
  }

  return (
    <div className="relative" dir={dir}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
          isScrolled 
            ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100" 
            : "text-white/90 hover:text-white hover:bg-white/10"
        }`}
        aria-label={t("navigation.language")}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{localeConfig[locale].label}</span>
        <span className="sm:hidden text-lg">{localeConfig[locale].flag}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} aria-hidden="true" />
          <div
            className={`absolute ${dir === "rtl" ? "left-0" : "right-0"} top-full z-20 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
          >
            <div className="py-1" role="menu" aria-orientation="vertical">
              {Object.entries(localeConfig).map(([code, config]) => (
                <button
                  key={code}
                  onClick={() => handleLocaleChange(code as Locale)}
                  className={`flex w-full items-center px-4 py-2 text-sm transition-colors ${
                    locale === code
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  role="menuitem"
                  dir={config.dir}
                >
                  <span className={`text-lg ${dir === "rtl" ? "ml-3" : "mr-3"}`}>{config.flag}</span>
                  <span className="font-medium">{config.label}</span>
                  {locale === code && (
                    <span className={`${dir === "rtl" ? "mr-auto" : "ml-auto"} text-primary-600`}>✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
