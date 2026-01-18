import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Almarai } from "next/font/google"
import "./globals.css"
import { I18nProvider } from "@/lib/i18n"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const almarai = Almarai({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-arabic",
  weight: ["300", "400", "700", "800"]
})

export const metadata: Metadata = {
  title: "سكون | SUKOON – مساحات عمل للمستقلين والطلاب في دمشق",
  description:
    "سكون - مساحات عمل راقية في قلب دمشق للمستقلين والطلاب والشركات الناشئة. بيئة عمل محفزة ومريحة مع خدمات متكاملة وأسعار تنافسية.",
  keywords: ["مساحة عمل", "دمشق", "مستقلين", "طلاب", "شركات ناشئة", "coworking", "Damascus", "freelancers"],
  openGraph: {
    title: "سكون | SUKOON – مساحات عمل للمستقلين والطلاب في دمشق",
    description: "سكون - مساحات عمل راقية في قلب دمشق للمستقلين والطلاب والشركات الناشئة",
    url: "https://sukoon.sy",
    siteName: "SUKOON",
    locale: "ar_SY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "سكون | SUKOON – مساحات عمل للمستقلين والطلاب في دمشق",
    description: "سكون - مساحات عمل راقية في قلب دمشق للمستقلين والطلاب والشركات الناشئة",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/fav.png',
  },
  generator: 'v0.dev'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#66489C",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4VE1VJKMWM"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4VE1VJKMWM');
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${almarai.variable} font-arabic antialiased`} suppressHydrationWarning>
        <I18nProvider>{children}</I18nProvider>
        <Toaster />
      </body>
    </html>
  )
}
