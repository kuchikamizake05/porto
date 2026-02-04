"use client";

import { motion } from "framer-motion";
import { User, Code2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import Magnetic from "./core/Magnetic";

export default function AboutSection() {
  return (
    <section id="about-me" className="py-8 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 md:px-0">
        <div className="mb-16 flex items-center gap-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight shrink-0">
            About <span className="text-blue-500 italic">Me</span>
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-8"
          >
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light">
              I am a passionate developer focused on creating 
              <span className="text-white font-medium"> high-performance </span> 
              and <span className="text-blue-400 font-medium"> visually stunning </span> 
              web applications. I bridge the gap between complex structural logic and 
              intuitive, premium design.
            </p>
            
            <Magnetic strength={0.2}>
              <Link 
                href="/about" 
                className="relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white text-sm font-bold tracking-widest uppercase transition-all overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                <span className="relative z-10">More About Me</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full md:w-80"
          >
            <div className="glass-card p-8 rounded-[2rem] border border-white/5 space-y-6">
              <div className="flex items-center gap-3 text-blue-400">
                <Code2 className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Brief</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed font-light italic">
                Focusing on digital architecture and motion-driven interfaces that leave a lasting impression.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
