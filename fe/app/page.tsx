"use client";

import { useEffect, useState } from "react";
import { apiGet } from "./lib/api";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, ChevronDown, ArrowDown } from "lucide-react";
import AboutSection from "./components/AboutSection";
import TechStack from "./components/TechStack";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import ContactSection from "./components/ContactSection";

import Spotlight from "./components/core/Spotlight";
import Magnetic from "./components/core/Magnetic";

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
    <div className="space-y-16 pb-20 overflow-x-hidden relative">
      {/* Immersive Background Blobs */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 100, 0], 
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0], 
            y: [0, 100, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, 50, 0], 
            y: [0, -100, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" 
        />
      </div>

      {/* Hero / About Section */}
      <section id="about" className="min-h-[60vh] flex flex-col justify-start pt-6 md:pt-8 scroll-mt-20 relative px-4 md:px-0">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto w-full relative z-10 flex flex-col md:flex-row items-center gap-12"
        >
          {/* Text Content */}
          <div className="flex-1 space-y-10 order-2 md:order-1 text-center md:text-left flex flex-col items-center md:items-start">
            {/* Greeting */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Available for new projects
            </motion.div>

            {/* Name & Title */}
            {profile && (
              <div className="space-y-6">
                <TypingAnimation 
                  text={profile.name} 
                  className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-[1.1]"
                />
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="text-2xl md:text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-500"
                >
                  {profile.role}
                </motion.p>
              </div>
            )}


            {/* CTA Buttons & Social */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center md:justify-start gap-8 pt-6"
            >
              <Magnetic strength={0.2}>
                <Link
                  href="#projects"
                  className="relative px-10 py-5 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all shadow-[0_0_40px_rgba(37,99,235,0.2)] flex items-center gap-3 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                  View Projects
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Magnetic>

              <div className="flex items-center gap-4">
                {[
                  { icon: Github, href: "https://github.com", color: "hover:text-white hover:bg-white/10" },
                  { icon: Linkedin, href: "https://linkedin.com", color: "hover:text-blue-400 hover:bg-blue-400/10" },
                  { icon: Mail, href: "mailto:your@email.com", color: "hover:text-red-400 hover:bg-red-400/10" }
                ].map((social, i) => (
                  <Magnetic key={i} strength={0.3}>
                    <a 
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`p-4 transition-all duration-300 flex items-center justify-center ${social.color}`}
                    >
                      <social.icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </motion.div>
          </div>

          {/* User Photo Area */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-64 h-64 md:w-80 md:h-80 order-1 md:order-2"
          >
            <div className="relative w-full h-full overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center text-zinc-800">
                <span className="text-4xl font-bold opacity-10 tracking-widest">PORTFOLIO</span>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </motion.div>
        </motion.div>

      </section>

      {/* Custom Interactive Vertical Hover Scroll Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1 }}
        className="flex justify-center -mt-8 mb-8"
      >
        <Link
          href="#about-me"
          className="group relative w-16 h-16 rounded-full border-2 border-blue-500/30 bg-black/20 backdrop-blur-md overflow-hidden flex items-center justify-center transition-colors duration-500 hover:border-blue-500/60"
        >
          {/* Vertical Fill Backdrop - Top to Bottom */}
          <motion.div
            className="absolute inset-0 bg-blue-600/20"
            initial={{ y: "-100%" }}
            whileHover={{ y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          
          <ArrowDown className="w-6 h-6 text-blue-400 relative z-10 transition-transform duration-500 group-hover:scale-110" />
        </Link>
      </motion.div>

      {/* Sections with Reveal Animation */}
      <div className="max-w-4xl mx-auto px-4 md:px-0 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <AboutSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <TechStack />
        </motion.div>


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
