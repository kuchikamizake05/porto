"use client";

import { useEffect, useState } from "react";
import { apiGet } from "./lib/api";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import ContactSection from "./components/ContactSection";

type Profile = {
  name: string;
  role: string;
  stack: string[];
};

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    apiGet<Profile>("/profile")
      .then(setProfile)
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-20 pb-20 overflow-x-hidden">
      {/* Hero / About Section */}
      <section id="about" className="min-h-[90vh] flex flex-col justify-center scroll-mt-20 relative px-4 md:px-0">
        {/* Decorative background elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl -z-10" />
        
        {/* Grid Background */}
        <div className="absolute inset-x-[-20vw] inset-y-0 w-[140vw] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-20" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 max-w-4xl mx-auto w-full"
        >
          {/* Greeting */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-bold uppercase tracking-widest shadow-2xl"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Available for new projects
          </motion.div>

          {/* Name & Title */}
          {!profile && (
            <div className="space-y-4">
              <div className="h-16 w-80 bg-white/5 rounded-lg animate-pulse" />
              <div className="h-8 w-56 bg-white/5 rounded-lg animate-pulse" />
            </div>
          )}

          {profile && (
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-6xl md:text-8xl font-bold tracking-tight text-white leading-[1.1]"
              >
                {profile.name}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-2xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400"
              >
                {profile.role}
              </motion.p>
            </div>
          )}

          {/* Bio */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed font-light italic"
          >
            &quot;I bridge the gap between complex logic and elegant design, 
            creating seamless digital experiences that leave a lasting impression.&quot;
          </motion.p>

          {/* CTA Buttons & Social */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap items-center gap-6 pt-6"
          >
            <Link
              href="#projects"
              className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all hover:scale-[1.05] active:scale-95 shadow-[0_0_30px_rgba(37,99,235,0.3)] flex items-center gap-2 group"
            >
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="flex items-center gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:your@email.com" className="p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent" />
        </motion.div>
      </section>

      {/* Sections with Reveal Animation */}
      <div className="max-w-4xl mx-auto px-4 md:px-0 space-y-32">
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
        >
            <ProjectsSection />
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
        >
            <ExperienceSection />
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
        >
            <ContactSection />
        </motion.div>
      </div>
    </div>
  );
}
