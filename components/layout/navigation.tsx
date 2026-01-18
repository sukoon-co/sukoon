"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import LanguageSwitcher from "@/components/ui/language-switcher";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface NavigationProps {
  isScrolled?: boolean;
  activeSection?: string;
}

export default function Navigation({ isScrolled = false, activeSection = "home" }: NavigationProps) {
  const { t, dir } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const navigationItems = [
    { href: "#home", label: t("navigation.home"), id: "home", isExternal: false },
    // { href: "#services", label: t("navigation.services"), id: "services", isExternal: false },
    { href: "#about", label: t("navigation.about"), id: "about", isExternal: false },
    { href: "/community", label: t("navigation.community"), id: "community", isExternal: true },
    { href: "#contact", label: t("navigation.contact"), id: "contact", isExternal: false },
  ];

  const scrollToSection = (href: string) => {
    if (pathname !== "/") {
      router.push("/" + href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navigateToHome = () => {
    router.push("/");
    setIsMobileMenuOpen(false);
  };

  const isActive = (item: any) => {
    if (item.isExternal) {
      return pathname === item.href;
    }
    return activeSection === item.id;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-primary-600/90 backdrop-blur-md"
      }`}
      dir={dir}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={navigateToHome}
            className="flex items-center space-x-2 rtl:space-x-reverse"
          >
            <img
              src={isScrolled ? "logo-h.svg" : "logo-wh.png"}
              className="w-auto"
              style={{ width: "160px" }}
              alt="SUKOON"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navigationItems.map((item) =>
              item.isExternal ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-medium transition-colors relative ${
                    isScrolled
                      ? isActive(item)
                        ? "text-primary-600"
                        : "text-gray-700 hover:text-primary-600"
                      : isActive(item)
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                  {isActive(item) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-current rounded-full" />
                  )}
                </Link>
              ) : (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`font-medium transition-colors relative ${
                    isScrolled
                      ? isActive(item)
                        ? "text-primary-600"
                        : "text-gray-700 hover:text-primary-600"
                      : isActive(item)
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                  {isActive(item) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-current rounded-full" />
                  )}
                </button>
              )
            )}

            <LanguageSwitcher isScrolled={isScrolled} />

            {/* <Button
              onClick={() => scrollToSection("#contact")}
              className={`${
                isScrolled
                  ? "bg-primary-600 hover:bg-primary-700 text-white"
                  : "bg-white text-primary-600 hover:bg-gray-100"
              } px-6`}
              size="sm"
            >
              {t("common.registerNow")}
            </Button> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4 rtl:space-x-reverse">
            <LanguageSwitcher isScrolled={isScrolled} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item) =>
                item.isExternal ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block w-full text-left py-2 font-medium transition-colors ${
                      isActive(item) ? "text-primary-600" : "text-gray-700 hover:text-primary-600"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className={`block w-full text-left py-2 font-medium transition-colors ${
                      isActive(item) ? "text-primary-600" : "text-gray-700 hover:text-primary-600"
                    }`}
                  >
                    {item.label}
                  </button>
                )
              )}
              {/* <Button
                onClick={() => scrollToSection("#contact")}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white mt-4"
              >
                {t("common.registerNow")}
              </Button> */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
