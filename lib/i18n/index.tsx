"use client"

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react"
import type { Locale } from "./config"
import { defaultLocale, detectLocale, localeConfig } from "./config"

type TranslationData = Record<string, any>

const translationCache = new Map<Locale, TranslationData>()

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, fallback?: string) => string
  isLoading: boolean
  dir: "ltr" | "rtl"
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export async function loadTranslations(locale: Locale): Promise<TranslationData> {
  if (translationCache.has(locale)) {
    return translationCache.get(locale)!
  }

  try {
    const translations = await import(`./locales/${locale}.ts`)
    translationCache.set(locale, translations.default)
    return translations.default
  } catch (error) {
    console.error(`Failed to load translations for locale: ${locale}`, error)
    if (locale !== defaultLocale) {
      return loadTranslations(defaultLocale)
    }
    return {}
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [translations, setTranslations] = useState<TranslationData>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeLocale = () => {
      const savedLocale = localStorage.getItem("sukoon-locale") as Locale
      const detectedLocale = detectLocale()
      const initialLocale = savedLocale || detectedLocale

      setLocaleState(initialLocale)
      updateDocumentDirection(initialLocale)
    }

    initializeLocale()
  }, [])

  useEffect(() => {
    loadTranslations(locale).then((data) => {
      setTranslations(data)
      setIsLoading(false)
    })
  }, [locale])

  const updateDocumentDirection = (newLocale: Locale) => {
    const config = localeConfig[newLocale]
    document.documentElement.dir = config.dir
    document.documentElement.lang = newLocale

    document.body.className = document.body.className.replace(/font-(sans|arabic)/g, "")
    document.body.classList.add(config.fontClass)
  }

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("sukoon-locale", newLocale)
    updateDocumentDirection(newLocale)
  }

  const t = (key: string, fallback?: string): string => {
    const keys = key.split(".")
    let value: any = translations

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        return fallback || key
      }
    }

    return typeof value === "string" ? value : fallback || key
  }

  const contextValue: I18nContextType = {
    locale,
    setLocale,
    t,
    isLoading,
    dir: localeConfig[locale].dir,
  }

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
