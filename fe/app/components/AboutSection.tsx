"use client";

import { motion } from "framer-motion";
import { User, Code2, Sparkles } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about-me" className="py-16 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 md:px-0">
        <div className="mb-16 flex items-center gap-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight shrink-0">
            About <span className="text-blue-500 italic">Me</span>
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 space-y-6"
          >
            <p className="text-xl text-gray-300 leading-relaxed font-light">
              I am a passionate developer focused on creating 
              <span className="text-white font-medium"> high-performance </span> 
              and <span className="text-blue-400 font-medium"> visually stunning </span> 
              web applications. With a keen eye for detail and a love for modern technology, 
              I bridge the gap between complex backend logic and intuitive frontend design.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed font-light">
              My journey in tech is driven by a constant desire to learn and push the boundaries 
              of what's possible in the browser. Whether it's crafting smooth animations 
              or architecting scalable systems, I strive for excellence in every line of code.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
              <div className="flex items-center gap-3 text-blue-400">
                <Code2 className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wider">Tech Focus</span>
              </div>
              <ul className="text-gray-400 space-y-2 text-sm font-light">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-blue-500" /> Full-stack Development
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-blue-500" /> UI/UX Motion Design
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-blue-500" /> Cloud Architecture
                </li>
              </ul>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
              <div className="flex items-center gap-3 text-indigo-400">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wider">Philosophy</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed font-light italic">
                "Simplicity is the soul of efficiency, and beauty is its skin."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
