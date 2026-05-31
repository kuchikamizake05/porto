"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TextReveal } from "@/components/ui/text-reveal";
import CircularGallery from "@/components/ui/circular-gallery";

const aboutText =
  "I am an IT student and software engineer focused on software development and cybersecurity. I enjoy building secure, reliable, and well-engineered web applications, combining clean interfaces with maintainable systems and a security-first mindset.";

export default function AboutSection() {
  return (
    <section
      id="about-me"
      className="pb-5 scroll-mt-24 mb-20 px-4 md:px-0 relative overflow-hidden"
    >
      {/* BACKGROUND TEXT */}
      <div className="absolute md:-top-30 left-1/2 -translate-x-1/2 select-none pointer-events-none -z-10 opacity-2">
        <span className="text-[15rem] md:text-[25rem] font-black text-white tracking-tighter uppercase whitespace-nowrap">
          About
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-0 relative">
        <div className="mb-5 flex items-center gap-6">
          <div className="h-px flex-1 bg-linear-to-r from-transparent to-white/20" />
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight shrink-0">
            About <span className="text-blue-500 italic">Me</span>
          </h2>
          <div className="h-px flex-1 bg-linear-to-r from-white/20 to-transparent" />
        </div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-3xl space-y-8 text-center"
          >
            <TextReveal>{aboutText}</TextReveal>

            {/* Circular Gallery WebGL Component */}
            <div className="h-[600px] relative w-full overflow-hidden">
              <CircularGallery 
                bend={1}
                textColor="#ffffff"
                borderRadius={0.05}
                scrollSpeed={2}
                scrollEase={0.05}
              />
            </div>

            <div className="flex justify-center">
              <Link
                href="/about"
                className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-b from-white/20 to-white/10 border border-white/10 text-white font-bold text-base tracking-wide overflow-hidden group hover:bg-white/10  transition-colors"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                <span className="relative z-10">More About Me</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
