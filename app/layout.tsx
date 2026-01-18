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
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PXRTFM8R');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className={`${inter.variable} ${almarai.variable} font-arabic antialiased`} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-PXRTFM8R"
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <I18nProvider>{children}</I18nProvider>
        <Toaster />
      </body>
    </html>
  )
}
