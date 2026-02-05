"use client";

import { motion } from "framer-motion";
import ExperienceSection from "../components/ExperienceSection";
import WhoIAmCarousel from "../components/WhoIAmCarousel";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const socialActions = [
    {
      label: "GitHub",
      icon: Github,
      href: "https://github.com",
      className:
        "bg-white/5 border border-white/10 text-zinc-400 hover:bg-black hover:text-white hover:border-black/50 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]",
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com",
      className:
        "bg-white/5 border border-white/10 text-zinc-400 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5]/50 hover:shadow-[0_0_30px_rgba(0,119,181,0.5)]",
    },
    {
      label: "Twitter",
      icon: Twitter,
      href: "https://twitter.com",
      className:
        "bg-white/5 border border-white/10 text-zinc-400 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]/50 hover:shadow-[0_0_30px_rgba(29,161,242,0.5)]",
    },
    {
      label: "Email",
      icon: Mail,
      href: "mailto:hello@example.com",
      className:
        "bg-white/5 border border-white/10 text-zinc-400 hover:bg-orange-500 hover:text-white hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]",
    },
  ];

  return (
    <div className="pt-32 pb-32">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-12 gap-6">
          {/* --- TOP ROW --- */}

          {/* Main Intro Card (Col 12 on mobile, Col 8 on desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="col-span-12 lg:col-span-8 glass-card rounded-[32px] p-6 md:p-8 flex flex-col justify-between h-full border border-white/5 relative overflow-hidden group"
          >
            {/* Soft background glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />

            <div className="space-y-6 relative z-10">
              {/* Intro Text */}
              <div className="space-y-4">
                <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
                  Hi, I'm <span className="text-blue-500"></span>
                </h1>
                <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed max-w-xl">
                  Digital Architect & Full-stack Engineer crafting premium web
                  experiences that live on the edge of innovation.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8 relative z-10">
              <a
                href="/resume.pdf"
                className="relative h-[46px] px-8 rounded-full border border-white/10 text-white font-bold text-xs md:text-sm tracking-wide flex items-center gap-2 overflow-hidden group/btn"
              >
                <div className="absolute inset-0 bg-white translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                <FileText className="w-4 h-4 relative z-10 group-hover/btn:text-black transition-colors duration-300" />
                <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">
                  Resume / CV
                </span>
              </a>
              <a
                href="#contact"
                className="relative h-[46px] px-8 rounded-full border border-white/10 text-white font-bold text-xs md:text-sm tracking-wide flex items-center gap-2 overflow-hidden group/btn"
              >
                <div className="absolute inset-0 bg-white translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">
                  Contact Me
                </span>
              </a>
            </div>
          </motion.div>

          {/* Social Grid (Col 12 on mobile, Col 4 on desktop) */}
          <div className="col-span-12 lg:col-span-4 grid grid-cols-2 gap-6 h-full">
            {socialActions.map((action, idx) => (
              <motion.a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`rounded-[32px] flex flex-col items-center justify-center transition-all duration-300 ${action.className} aspect-square w-full shadow-lg group relative overflow-hidden`}
              >
                <action.icon className="w-10 h-10 md:w-12 md:h-12 transition-transform duration-500 group-hover:scale-110" />
              </motion.a>
            ))}
          </div>

          {/* --- BOTTOM ROW --- */}

          {/* Carousel: Who Am I (Col 12) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-12 h-full min-h-[350px]"
          >
            <WhoIAmCarousel />
          </motion.div>

          {/* Experience Feed (Col 12 - Full Width) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="col-span-12"
          >
            <ExperienceSection />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
