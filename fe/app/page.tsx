"use client";

import { useEffect, useState } from "react";
import { apiGet } from "./lib/api";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import AboutSection from "./components/AboutSection";
import TechStack from "./components/TechStack";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import Image from "next/image";
import TypingAnimation from "./components/core/TypingAnimation";
import Magnetic from "./components/core/Magnetic";

type Profile = {
  name: string;
  roles: string[];
  stack: string[];
};

function AnimatedRole({
  roles,
  delay = 0,
}: {
  roles: string[];
  delay?: number;
}) {
  const [index, setIndex] = useState<number>(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!roles.length) return;

    const showTimeout = setTimeout(() => {
      setVisible(true);
    }, delay);

    return () => clearTimeout(showTimeout);
  }, [roles, delay]);

  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % roles.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [visible, roles]);

  if (!visible) return null;

  return (
    <motion.p
      key={roles[index]}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-xl md:text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-500"
    >
      {roles[index]}
    </motion.p>
  );
}

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    apiGet<Profile>("/profile").then(setProfile).catch(console.error);
  }, []);

  return (
    <div className="space-y-16 pb-20 overflow-x-hidden relative">
      {/* Immersive Background Blobs */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]"
        />
      </div>

      {/* Hero / About Section */}
      <section
        id="about"
        className="min-h-[70vh] flex flex-col justify-start pt-20 md:pt-25 scroll-mt-20 relative px-4 md:px-0 overflow-hidden"
      >
        {/* Viral UI Effects */}

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
              className="inline-flex items-center gap-2 text-blue-400 text-[12px] font-bold uppercase tracking-[0.2em]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Long life learner
            </motion.div>

            {/* Name & Title */}
            {profile && (
              <div className="space-y-6">
                <TypingAnimation
                  text={profile.name}
                  className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground leading-[1.1]"
                />
                <AnimatedRole
                  roles={profile.roles}
                  delay={profile.name.length * 80 + 300}
                />
              </div>
            )}

            {/* CTA Button only */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex items-center justify-center md:justify-start"
            >
              <Magnetic strength={0.0}>
                <Link
                  href="/projects"
                  className="relative h-[46px] px-6 rounded-full bg-gradient-to-b from-blue-500  to-blue-800 text-white text-sm font-bold hover:bg-gradient-to-b hover:from-blue-400 hover:to-blue-600 transition-all shadow-[0_0_30px_rgba(37,99,235,0.15)] flex items-center gap-2 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                  View Projects
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Magnetic>
            </motion.div>
          </div>

          {/* User Photo Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="relative w-64 md:w-80"
          >
            {/* Arch Frame */}
            <div
              className="
    relative
    w-full
    aspect-[19/20]
    rounded-t-full
    overflow-hidden
    bg-gradient-to-b from-blue-400 to-blue-900
    shadow-[0_20px_50px_rgba(0,0,0,0.25)]
  "
            >
              {/* NOISE OVERLAY */}
              <div
                className="
      absolute inset-0
      bg-[url('/formal-invitation.svg')]
      opacity-[0.2]
      pointer-events-none
      mix-blend-overlay
    "
              />

              {/* IMAGE */}
              <Image
                src="/fotoku.png"
                alt="Portrait"
                fill
                priority
                className="object-cover object-center"
              />
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
        className="flex justify-center -mt-8 md:-mt-12 md:mb-8 mb-0"
      >
        <Link href="#about-me" className="group relative block">
          <div
            className="
      relative
      h-12 w-12
      group-hover:w-28
      rounded-full
      border-1 border-blue-500
      bg-transparent
      overflow-hidden
      transition-all duration-500 ease-out
      flex items-center justify-center
    "
          >
            {/* LIQUID LAYER (TIDAK IKUT RESIZE) */}
            {/* <div className="absolute inset-0 pointer-events-none">
              <span
                className="
        absolute
        left-1/2 top-1/2
        -translate-x-1/2 -translate-y-1/2
        w-32 h-32
        bg-blue-950
        rounded-full
        scale-0
        transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
        group-hover:scale-150
      "
              />
            </div> */}

            {/* TEXT */}
            <span
              className="
        absolute
        left-1/2
        -translate-x-1/2
        text-mediums font-medium text-blue-500
        opacity-0
        transition-all duration-300 ease-out
        group-hover:opacity-100
        group-hover:-translate-x-[80%]
        group-hover:font-bold
        whitespace-nowrap
      "
            >
              Scroll
            </span>

            {/* ARROW */}
            <ArrowDown
              className="
        absolute
        w-5 h-5 text-blue-500
        transition-transform duration-500 ease-out
        group-hover:translate-x-6
      "
            />
          </div>
        </Link>
      </motion.div>

      {/* Sections with Reveal Animation */}
      <div className="max-w-4xl mx-auto px-4 md:px-0 space-y-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mt-32"
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
          <ContactSection />
        </motion.div>
      </div>
    </div>
  );
}
