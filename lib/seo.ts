/**
 * SEO Configuration and utilities
 * Provides structured data and meta tags for better search engine optimization
 */

import type { Locale } from "./i18n/config"

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: "website" | "article" | "business"
  locale?: Locale
}

/**
 * Generate structured data for business
 */
export function generateBusinessStructuredData(locale: Locale = "en") {
  const isArabic = locale === "ar"

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "SUKOON Workspace",
    description: isArabic
      ? "مساحات عمل مشتركة متميزة للمحترفين والمستقلين والطلاب"
      : "Premium coworking spaces for professionals, freelancers, and students",
    url: "https://sukoon.com",
    telephone: "+1-555-123-4567",
    email: "hello@sukoon.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Business District",
      addressLocality: "Downtown City",
      addressRegion: "DC",
      postalCode: "12345",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "40.7589",
      longitude: "-73.9851",
    },
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "$$",
    image: "https://sukoon.com/images/workspace-hero.jpg",
    sameAs: [
      "https://facebook.com/sukoonworkspace",
      "https://twitter.com/sukoonworkspace",
      "https://linkedin.com/company/sukoonworkspace",
    ],
  }
}

/**
 * Generate page-specific meta tags
 */
export function generateMetaTags(config: SEOConfig) {
  const {
    title,
    description,
    keywords = [],
    image = "/images/sukoon-og.jpg",
    url = "https://sukoon.com",
    type = "website",
    locale = "en",
  } = config

  return {
    title,
    description,
    keywords: keywords.join(", "),
    openGraph: {
      title,
      description,
      url,
      siteName: "SUKOON Workspace",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@sukoonworkspace",
    },
    alternates: {
      canonical: url,
      languages: {
        en: `${url}/en`,
        ar: `${url}/ar`,
      },
    },
  }
}

/**
 * Default SEO configuration for different pages
 */
export const defaultSEO = {
  home: {
    en: {
      title: "SUKOON - Premium Workspace Solutions for Professionals",
      description:
        "Discover premium coworking spaces designed for freelancers, students, and professionals. Flexible memberships, modern amenities, and vibrant community at SUKOON.",
      keywords: ["coworking space", "workspace", "freelancer", "office rental", "business center", "SUKOON"],
    },
    ar: {
      title: "سكون - حلول مساحات العمل المتميزة للمحترفين",
      description:
        "اكتشف مساحات العمل المشتركة المتميزة المصممة للمستقلين والطلاب والمحترفين. عضويات مرنة ووسائل راحة حديثة ومجتمع نابض بالحياة في سكون.",
      keywords: ["مساحة عمل مشتركة", "مساحة عمل", "مستقل", "تأجير مكتب", "مركز أعمال", "سكون"],
    },
  },
  about: {
    en: {
      title: "About SUKOON - Our Story and Mission",
      description:
        "Learn about SUKOON's mission to provide exceptional workspace solutions. Discover our story, values, and commitment to fostering professional growth.",
      keywords: ["about SUKOON", "company story", "mission", "workspace solutions", "professional growth"],
    },
    ar: {
      title: "حول سكون - قصتنا ومهمتنا",
      description:
        "تعرف على مهمة سكون في توفير حلول مساحات العمل الاستثنائية. اكتشف قصتنا وقيمنا والتزامنا بتعزيز النمو المهني.",
      keywords: ["حول سكون", "قصة الشركة", "المهمة", "حلول مساحات العمل", "النمو المهني"],
    },
  },
  contact: {
    en: {
      title: "Contact SUKOON - Get in Touch Today",
      description:
        "Ready to join SUKOON? Contact us to schedule a tour, learn about membership options, or get answers to your questions.",
      keywords: ["contact SUKOON", "workspace tour", "membership", "get in touch", "office location"],
    },
    ar: {
      title: "اتصل بسكون - تواصل معنا اليوم",
      description:
        "مستعد للانضمام إلى سكون؟ اتصل بنا لجدولة جولة أو معرفة خيارات العضوية أو الحصول على إجابات لأسئلتك.",
      keywords: ["اتصل بسكون", "جولة مساحة العمل", "العضوية", "تواصل معنا", "موقع المكتب"],
    },
  },
}
