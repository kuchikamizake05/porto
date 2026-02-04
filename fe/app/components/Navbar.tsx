"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Code2, 
  Briefcase, 
  Mail, 
  Home, 
  Sun, 
  Moon,
  Clock,
  Github,
  Linkedin
} from "lucide-react";
import { useTheme } from "./core/ThemeProvider";
import Magnetic from "./core/Magnetic";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const internalLinks = [
    { href: "/#", icon: Home, label: "Home" },
    { href: "#about-me", icon: User, label: "About" },
    { href: "#projects", icon: Briefcase, label: "Projects" },
  ];

  const socialLinks = [
    { href: "https://github.com", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <>
      {/* Top Header Bar (Fixed elements) */}
      <div className="fixed top-0 left-0 w-full z-[60] px-8 py-7 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="pointer-events-auto">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold tracking-tight text-foreground group"
            >
              Kuchikamizake<span className="text-blue-500 group-hover:text-blue-400 transition-colors">.</span>
            </motion.div>
          </Link>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-foreground/50 font-mono text-sm pointer-events-auto"
          >
            <Clock className="w-4 h-4" />
            <span>
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Futuristic Floating Pill Navigation - Redesigned */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
        <motion.nav 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="pointer-events-auto px-4 py-1 rounded-full glass-card border border-white/10 flex items-center gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)] bg-background/70 backdrop-blur-3xl"
        >
          {/* Internal Navigation Group */}
          {internalLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Magnetic key={link.href} strength={0.1}>
                <Link
                  href={link.href}
                  className={`relative p-2.5 rounded-full transition-all duration-300 group ${
                    isActive ? "text-blue-500" : "text-foreground/40 hover:text-foreground"
                  }`}
                >
                  {/* Subtle Glow on Hover */}
                  <div className="absolute inset-x-2 -bottom-1 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-opacity" />
                  
                  {/* Active Background Circle */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-blue-500/10 rounded-full border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}

                  <link.icon className={`w-5 h-5 relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]`} />
                  
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-foreground text-background text-[9px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none uppercase tracking-widest leading-none translate-y-2 group-hover:translate-y-0 shadow-xl border border-border/50">
                    {link.label}
                  </div>
                </Link>
              </Magnetic>
            );
          })}

          <div className="w-[1px] h-4 bg-border/40 mx-1" />

          {/* Theme Toggle Group */}
          <Magnetic strength={0.1}>
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-foreground/40 hover:text-foreground transition-all duration-300 relative group"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  {theme === "dark" ? <Sun className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" /> : <Moon className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />}
                </motion.div>
              </AnimatePresence>

              {/* Tooltip */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-foreground text-background text-[9px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none uppercase tracking-widest leading-none translate-y-2 group-hover:translate-y-0 shadow-xl whitespace-nowrap border border-border/50">
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </div>
            </button>
          </Magnetic>
        </motion.nav>
      </div>
    </>
  );
}
