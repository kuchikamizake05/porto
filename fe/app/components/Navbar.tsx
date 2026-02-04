"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Briefcase, 
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

  const navItems = [
    { href: "/#", icon: Home, label: "Home" },
    { href: "/about", icon: User, label: "About" },
    { href: "/projects", icon: Briefcase, label: "Projects" },
  ];

  const socialItems = [
    { href: "https://github.com", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <>
      {/* Top Header Bar */}
      <div className="fixed top-0 left-0 w-full z-[60] px-8 py-8 pointer-events-none">
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

      {/* Mini High-Precision Floating Pill Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
        <motion.nav 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto h-[48px] px-4 py-1 rounded-full border border-white/15 flex items-center gap-2 shadow-[0px_15px_40px_rgba(0,0,0,0.2)] bg-white/70 dark:bg-black/70 backdrop-blur-[20px]"
        >
          {/* Group 1: Navigation */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Magnetic key={item.label} strength={0.1}>
                  <Link
                    href={item.href}
                    className={`relative w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 group ${
                      isActive ? "text-blue-600 dark:text-blue-400" : "text-foreground/50 hover:text-foreground"
                    }`}
                  >
                    {/* Active Background Circle (28px - scaled for 32px area) */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill-active"
                        className="absolute w-7 h-7 bg-blue-500/15 rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    <item.icon className="w-[18px] h-[18px] relative z-10 transition-transform duration-300 group-hover:scale-110" />
                    
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[9px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none uppercase tracking-widest leading-none translate-y-2 group-hover:translate-y-0 shadow-lg border border-border/50">
                      {item.label}
                    </div>
                  </Link>
                </Magnetic>
              );
            })}
          </div>

          {/* Group Divider */}
          <div className="w-[1px] h-3 bg-foreground/15 mx-1" />

          {/* Group 2: Socials */}
          <div className="flex items-center gap-2">
            {socialItems.map((item) => (
              <Magnetic key={item.label} strength={0.1}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 group text-foreground/50 hover:text-foreground"
                >
                  <item.icon className="w-[18px] h-[18px] relative z-10 transition-transform duration-300 group-hover:scale-110" />
                  
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[9px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none uppercase tracking-widest leading-none translate-y-2 group-hover:translate-y-0 shadow-lg border border-border/50">
                    {item.label}
                  </div>
                </a>
              </Magnetic>
            ))}
          </div>

          {/* Group Divider */}
          <div className="w-[1px] h-3 bg-foreground/15 mx-1" />

          {/* Group 3: Theme Toggle */}
          <Magnetic strength={0.1}>
            <button
              onClick={toggleTheme}
              className="relative w-8 h-8 flex items-center justify-center rounded-full text-foreground/50 hover:text-foreground transition-all duration-300 group"
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
                  {theme === "dark" ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
                </motion.div>
              </AnimatePresence>

              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[9px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none uppercase tracking-widest leading-none translate-y-2 group-hover:translate-y-0 shadow-lg whitespace-nowrap border border-border/50">
                {theme === "dark" ? "Light" : "Dark"}
              </div>
            </button>
          </Magnetic>
        </motion.nav>
      </div>
    </>
  );
}
