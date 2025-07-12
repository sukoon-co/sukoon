"use client"

/**
 * SUKOON Footer Component
 * Reusable footer with i18n support
 */

import Link from "next/link"
import { useI18n } from "@/lib/i18n"

export default function Footer() {
  const { t, dir } = useI18n()

  const social = [
    { label: "Facebook", href: "#", icon: "f" },
    { label: "Twitter", href: "#", icon: "t" },
    { label: "LinkedIn", href: "#", icon: "in" },
  ]

  return (
    <footer className="bg-gray-900 text-white py-16" dir={dir}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand + description */}
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-6">
              <img src="logo.png" className="w-auto" alt="SUKOON" />
            </div>

            <p className="text-gray-400 mb-6">{t("footer.description")}</p>

            {/* Social */}
            {/* <div className="flex space-x-4 rtl:space-x-reverse">
              {social.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                >
                  <span className="text-sm font-bold">{s.icon}</span>
                </Link>
              ))}
            </div> */}
          </div>

          {/* Services */}
          {/* <div>
            <h3 className="text-lg font-bold mb-6">{t("footer.services.title")}</h3>
            <ul className="space-y-3 text-gray-400">
              {(t("footer.services.items", []) as string[]).map((item, index) => (
                <li key={index}>
                  <Link href="#" className="hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Company */}
          {/* <div>
            <h3 className="text-lg font-bold mb-6">{t("footer.company.title")}</h3>
            <ul className="space-y-3 text-gray-400">
              {(t("footer.company.items", []) as string[]).map((item, index) => (
                <li key={index}>
                  <Link href="#" className="hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Support */}
          {/* <div>
            <h3 className="text-lg font-bold mb-6">{t("footer.support.title")}</h3>
            <ul className="space-y-3 text-gray-400">
              {(t("footer.support.items", []) as string[]).map((item, index) => (
                <li key={index}>
                  <Link href="#" className="hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} SUKOON. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  )
}
