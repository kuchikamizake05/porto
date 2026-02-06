"use client";

import { motion } from "framer-motion";
import { User, Code2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import Magnetic from "@/components/ui/Magnetic";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about-me" className="py-0 scroll-mt-24 mb-20">
      <div className="max-w-4xl mx-auto px-4 md:px-0">
        <div className="mb-5 flex items-center gap-6">
          <div className="h-px flex-1 bg-linear-to-r from-transparent to-white/20" />
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight shrink-0">
            About <span className="text-blue-500 italic">Me</span>
          </h2>
          <div className="h-px flex-1 bg-linear-to-r from-white/20 to-transparent" />
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-8 order-2 md:order-1"
          >
            <p className="text-xl text-justify md:text-2xl text-gray-400 leading-relaxed font-light">
              I am a developer with a strong focus on building
              <span className="text-white font-medium"> performant </span>
              and{" "}
              <span className="text-blue-400 font-medium">
                thoughtfully crafted
              </span>{" "}
              web experiences, combining solid engineering with refined visual
              details.
            </p>

            <div className="flex justify-center md:justify-start">
              <Link
                href="/about"
                className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-b from-white/20 to-white/10 border border-white/10 text-white font-bold text-base tracking-wide overflow-hidden group hover:bg-white/10  transition-colors"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                <span className="relative z-10">More About Me</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full md:w-80 order-1 md:order-2"
          >
            <div className=" p-0  space-y-6">
              {/* LOGO + NAME */}
              <div className="flex flex-col items-center gap-1 p-6 md:p-4 lg:p-0">
                <div className="w-32 md:w-48 lg:w-50">
                  <Image
                    src="/logo.png" // ganti sesuai nama file logo
                    alt="Kuchikamizake Logo"
                    width={200}
                    height={200}
                    className="w-full h-auto opacity-100"
                  />
                </div>
                <span className=" text-2xl md:text-2xl font-medium tracking-wide text-white">
                  Kuchikamizake<span className="text-blue-400">.</span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
