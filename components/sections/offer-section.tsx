"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function OfferSection() {
  const { t, dir } = useI18n();
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const navigateToCommunity = () => {
    router.push("/community");
  };

  return (
    <section
      className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 relative overflow-hidden"
      dir={dir}
      ref={ref}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("/sukoon-pattern.png")`,
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        />
      </div>

      {/* Floating Elements */}
      {/* <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute top-10 right-10 w-20 h-20 border-2 border-white/20 rounded-full"
      />
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute bottom-10 left-10 w-16 h-16 bg-white/10 rounded-lg"
      /> */}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <Sparkles className="h-16 w-16 text-yellow-300" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute inset-0 bg-yellow-300/20 rounded-full blur-xl"
              />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
            style={{ lineHeight: "1.4" }} 
          >
            {t("offer.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {t("offer.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Button
              onClick={navigateToCommunity}
              size="lg"
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {t("offer.cta")}
              <ArrowRight className={`h-5 w-5 ${dir === "rtl" ? "mr-2" : "ml-2"}`} />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
